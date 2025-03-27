import { Test, TestingModule } from '@nestjs/testing';
import { Experiments2Service } from './experiments2.service';

describe('Experiments2Service', () => {
  let service: Experiments2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Experiments2Service],
    }).compile();

    service = module.get<Experiments2Service>(Experiments2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
