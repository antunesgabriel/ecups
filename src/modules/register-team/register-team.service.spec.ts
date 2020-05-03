import { Test, TestingModule } from '@nestjs/testing';
import { RegisterTeamService } from './register-team.service';

describe('RegisterTeamService', () => {
  let service: RegisterTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterTeamService],
    }).compile();

    service = module.get<RegisterTeamService>(RegisterTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
