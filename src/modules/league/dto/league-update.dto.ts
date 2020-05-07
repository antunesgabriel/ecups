import { LeagueCreateDTO } from './league-create.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class LeagueUpdateDTO extends LeagueCreateDTO {
  @IsOptional()
  @IsBoolean()
  started: boolean;
}
