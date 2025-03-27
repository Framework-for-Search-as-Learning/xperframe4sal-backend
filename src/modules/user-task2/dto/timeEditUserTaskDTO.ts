export class TimeEditUserTaskDto {
  isPaused?: boolean;
  hasFinishedTask?: boolean;
  startTime?: Date;
  endTime?: Date;
  pauseTime?: Date[];
  resumeTime?: Date[];
}
