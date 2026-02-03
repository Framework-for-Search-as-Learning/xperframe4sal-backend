import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {LlmSessionService} from './llm-session.service';
import {Response} from 'express';

@Controller('llm-session')
export class LlmSessionController {
  constructor(private readonly llmSessionService: LlmSessionService) {}

  @Post('start')
  async startSession(@Body() body: {taskId: string; userId: string}) {
    return this.llmSessionService.startSession(body.userId, body.taskId);
  }

  @Post(':id/message')
  async sendMessage(
    @Param('id') sessionId: string,
    @Body() body: {userId: string; content: string},
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      const {stream, saveBotResponse} =
        await this.llmSessionService.processChatMessage(
          sessionId,
          body.userId,
          body.content,
        );

      let fullBotResponse = '';

      for await (const chunk of stream) {
        const chunkText = chunk.text();
        fullBotResponse += chunkText;
        res.write(chunkText);
      }

      await saveBotResponse(fullBotResponse);
    } catch (error) {
      console.error('Error processing chat message:', error.message);
      res.write('\n[ERROR: Error to generate  response]');
      res.end();
    }
  }
}
