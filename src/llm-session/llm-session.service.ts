import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {LlmSession} from './entity/llm-session.entity';
import {Repository} from 'typeorm';
import {LlmMessage} from './entity/llm-message.entity';
import {Task} from 'src/modules/task2/entities/task.entity';
import {User} from 'src/modules/user2/entity/user.entity';
import {Content, GoogleGenerativeAI} from '@google/generative-ai';

@Injectable()
export class LlmSessionService {
  constructor(
    @InjectRepository(LlmSession)
    private readonly llmSessionRepository: Repository<LlmSession>,
    @InjectRepository(LlmMessage)
    private readonly llmMessageRepository: Repository<LlmMessage>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async startSession(userId: string, taskId: string): Promise<LlmSession> {
    const task = await this.taskRepository.findOne({where: {_id: taskId}});
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const newSession = this.llmSessionRepository.create({
      user: {_id: userId} as User,
      task: task,
    });

    return await this.llmSessionRepository.save(newSession);
  }

  async processChatMessage(sessionId: string, userId: string, content: string) {
    const session = await this.llmSessionRepository.findOne({
      where: {id: sessionId},
      relations: ['task', 'user'],
      select: {
        id: true,
        task: {
          _id: true,
          geminiApiKey: true,
        },
      },
    });
    if (!session) throw new NotFoundException('Session not found');
    if (session.user._id !== userId)
      throw new ForbiddenException('Session does not belong to user');
    if (!session.task.geminiApiKey)
      throw new ForbiddenException('Task without AI configuration');

    await this.llmMessageRepository.save({
      content: content,
      role: 'user',
      session: session,
    });

    const history = await this.llmMessageRepository.find({
      where: {session: {id: sessionId}},
      order: {createdAt: 'ASC'},
      take: 20,
    });

    const historyForAi: Content[] = history.slice(0, -1).map((msg) => ({
      role: msg.role,
      parts: [{text: msg.content}],
    }));

    const genAI = new GoogleGenerativeAI(session.task.geminiApiKey);
    const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'});
    const chat = model.startChat({history: historyForAi});

    try {
      const result = await chat.sendMessageStream(content);

      return {
        stream: result.stream,
        saveBotResponse: async (fulltext: string) => {
          await this.llmMessageRepository.save({
            content: fulltext,
            role: 'model',
            session: session,
          });
        },
      };
    } catch (error) {
      console.error('Error Gemini:', error);
      throw new Error('Error processing Gemini AI response');
    }
  }
}
