import { Test, TestingModule } from '@nestjs/testing';
import { RegisterTeamController } from './register-team.controller';

describe('RegisterTeam Controller', () => {
  let controller: RegisterTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterTeamController],
    }).compile();

    controller = module.get<RegisterTeamController>(RegisterTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
