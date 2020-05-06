import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GameEntity } from './game.entity';
import { LeagueTypeEntity } from './leagueType.entity';

@Entity({ name: 'leagues' })
export class LeagueEntity {
  @PrimaryGeneratedColumn({ name: 'league_id' })
  leagueId: number;

  @Column({ nullable: false })
  league: string;

  @Column({ type: 'text', nullable: true })
  rules: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'round_trip', type: 'boolean', nullable: false })
  roundTrip: boolean;

  @Column({ name: 'max_players', nullable: true, type: 'number' })
  maxPlayers: number;

  @Column({ name: 'max_teams', nullable: true, type: 'number' })
  maxTeams: number;

  // team ou player
  @Column({ nullable: false })
  competitor: string;

  //Relacionamento
  @ManyToOne(
    () => GameEntity,
    game => game.leagues,
  )
  @JoinColumn({ name: 'game_id' })
  game: GameEntity;

  @ManyToOne(
    () => LeagueTypeEntity,
    type => type.leagues,
  )
  @JoinColumn({ name: 'leaguetype_id' })
  leagueType: LeagueTypeEntity;
}
