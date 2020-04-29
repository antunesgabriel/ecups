import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TeamEntity } from './team.entity';
import { ChampionshipEntity } from './championship.entity';

@Entity({ name: 'register_teams' })
export class RegisterTeam {
  @PrimaryGeneratedColumn({ name: 'register_id' })
  public registerId: number;

  @Column({
    nullable: true,
    type: 'timestamp',
    name: 'confirmation_date',
    default: null,
  })
  public confirmationDate: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    name: 'refused_date',
    default: null,
  })
  public refusedDate: Date;

  @ManyToOne(
    () => TeamEntity,
    team => team.registrations,
  )
  @JoinColumn({ name: 'team_id' })
  public team: TeamEntity;

  @ManyToOne(
    () => ChampionshipEntity,
    championship => championship.registeredTeams,
  )
  @JoinColumn({ name: 'championship_id' })
  public championship: ChampionshipEntity;
}
