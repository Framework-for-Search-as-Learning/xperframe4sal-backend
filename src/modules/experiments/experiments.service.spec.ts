import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentsService } from './experiments.service';

describe('ExperimentsService', () => {
  let service: ExperimentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperimentsService],
    }).compile();

    service = module.get<ExperimentsService>(ExperimentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
