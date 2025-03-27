import { Test, TestingModule } from '@nestjs/testing';
import { ICFService } from './icf.service';

describe('IcfService', () => {
  let service: ICFService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ICFService],
    }).compile();

    service = module.get<ICFService>(ICFService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
