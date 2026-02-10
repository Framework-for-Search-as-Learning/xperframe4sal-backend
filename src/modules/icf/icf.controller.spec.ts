import { Test, TestingModule } from '@nestjs/testing';
import { IcfController } from './icf.controller';

describe('IcfController', () => {
  let controller: IcfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcfController],
    }).compile();

    controller = module.get<IcfController>(IcfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
