import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentService } from './experiment.service';

describe('ExperimentService', () => {
  let service: ExperimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperimentService],
    }).compile();

    service = module.get<ExperimentService>(ExperimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
