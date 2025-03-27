import { Test, TestingModule } from '@nestjs/testing';
import { ICFController } from './icf.controller';
import { ICFService } from './icf.service';

describe('IcfController', () => {
  let controller: ICFController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ICFController],
      providers: [ICFService],
    }).compile();

    controller = module.get<ICFController>(ICFController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
