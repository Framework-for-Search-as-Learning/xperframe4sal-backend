import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserTaskSession} from './entities/user-task-session.entity';
import {Repository} from 'typeorm';
import {CreateUserTaskSessionDto} from './dto/create-userTaskSession.dto';

@Injectable()
export class UserTaskSession2Service {
  constructor(
    @InjectRepository(UserTaskSession)
    private readonly userTaskSessionRepository: Repository<UserTaskSession>,
  ) {}

  async create(
    createUserTaskSession: CreateUserTaskSessionDto,
  ): Promise<UserTaskSession> {
    createUserTaskSession.timestamp = new Date();
    return await this.userTaskSessionRepository.save(createUserTaskSession);
  }

  async findAll(): Promise<UserTaskSession[]> {
    return await this.userTaskSessionRepository.find();
  }

  async findOne(id: string): Promise<UserTaskSession> {
    return await this.userTaskSessionRepository.findOne({where: {_id: id}});
  }

  async findByUserId(userId: string): Promise<UserTaskSession[]> {
    return await this.userTaskSessionRepository.find({
      where: {user_id: userId},
    });
  }

  async finByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<UserTaskSession[]> {
    return await this.userTaskSessionRepository.find({
      where: {
        user_id: userId,
        task_id: taskId,
      },
    });
  }

  //TODO removeByUserIdAndTaskId

  //TODO remove

  //TODO update

  /*
  async openPage(openPageDto: OpenPageDto): Promise<UserTaskSession>{
    const {id, rank, userTaskSession, handlePage} = openPageDto
    let attempt = 0
    while (attempt < 2){
        try{
            if(userTaskSession){
                //TODO verificar como lidar com pages na nova versao
                if(!userTaskSession.pages){
                    
                }
                
            
            }
        }catch
    }
  };
  */
}
