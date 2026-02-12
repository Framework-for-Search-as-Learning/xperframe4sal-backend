/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

export class TimeEditUserTaskDto {
  isPaused?: boolean;
  hasFinishedTask?: boolean;
  startTime?: Date;
  endTime?: Date;
  pauseTime?: Date[];
  resumeTime?: Date[];
  metadata?: any | null;
}
