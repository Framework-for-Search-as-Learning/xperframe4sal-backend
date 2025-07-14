import {UserTaskSession} from '../entities/user-task-session.entity';

export interface HandlePageDto {
  url: string;
  title: string;
}

export class OpenPageDto {
  id: string;

  rank: number;

  userTaskSession: UserTaskSession;

  handlePage: HandlePageDto;
}
