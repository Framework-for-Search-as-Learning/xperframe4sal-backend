import { Test, TestingModule } from '@nestjs/testing';
import { User2Controller } from './user2.controller';

describe('User2Controller', () => {
  let controller: User2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [User2Controller],
    }).compile();

    controller = module.get<User2Controller>(User2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
