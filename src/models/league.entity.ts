import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameEntity } from './game.entity';
import { LeagueTypeEntity } from './leagueType.entity';
import { Exclude } from 'class-transformer';

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

  @Column({ name: 'max_players', nullable: true, type: 'int', default: null })
  maxPlayers: number;

  @Column({ name: 'max_teams', nullable: true, type: 'int', default: null })
  maxTeams: number;

  // team ou player
  @Column({ nullable: false })
  competitor: string;

  @Column({ name: 'league_start', nullable: true, type: 'timestamp' })
  leagueStart: Date;

  @Column({ name: 'league_end', nullable: true, type: 'timestamp' })
  leagueEnd: Date;

  @Column({ name: 'need_address', nullable: false, type: 'boolean' })
  needAddress: boolean;

  @Column({ name: 'started', nullable: false, type: 'boolean', default: false })
  started: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', insert: false, nullable: true })
  @Exclude()
  updatedAt: Date;

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
