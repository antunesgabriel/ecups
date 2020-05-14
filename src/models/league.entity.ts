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
import { UserEntity } from './user.entity';

@Entity({ name: 'leagues' })
export class LeagueEntity {
  @PrimaryGeneratedColumn({ name: 'league_id' })
  leagueId: number;

  @Column({ nullable: false, unique: true })
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
  @Column({
    nullable: false,
    type: 'boolean',
    name: 'for_teams',
    default: true,
  })
  forTeams: boolean;

  @Column({ name: 'league_start', nullable: true, type: 'timestamp' })
  leagueStart: Date;

  @Column({ name: 'league_end', nullable: true, type: 'timestamp' })
  leagueEnd: Date;

  @Column({ name: 'need_address', nullable: false, type: 'boolean' })
  needAddress: boolean;

  @Column({ name: 'started', nullable: false, type: 'boolean', default: false })
  started: boolean;

  @Column({ nullable: false, default: true, type: 'boolean' })
  active: boolean;

  @Column({ nullable: true, default: null, type: 'text' })
  thumb: string;

  selectGame: string;

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

  @ManyToOne(
    () => UserEntity,
    user => user.leagues,
    { eager: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
