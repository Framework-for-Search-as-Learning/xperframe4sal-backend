import { Test, TestingModule } from '@nestjs/testing';
import { Survey2Service } from './survey2.service';

describe('Survey2Service', () => {
  let service: Survey2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Survey2Service],
    }).compile();

    service = module.get<Survey2Service>(Survey2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
