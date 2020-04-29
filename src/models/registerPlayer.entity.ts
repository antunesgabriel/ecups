import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { PlayerEntity } from './player.entity';
import { ChampionshipEntity } from './championship.entity';

@Entity({ name: 'register_players' })
export class RegisterPlayer {
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
    () => PlayerEntity,
    player => player.registrations,
  )
  @JoinColumn({ name: 'player_id' })
  public player: PlayerEntity;

  @ManyToOne(
    () => ChampionshipEntity,
    championship => championship.registeredPlayers,
  )
  @JoinColumn({ name: 'championship_id' })
  public championship: ChampionshipEntity;
}
