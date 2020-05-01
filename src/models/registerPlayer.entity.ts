import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PlayerEntity } from './player.entity';
import { ChampionshipEntity } from './championship.entity';
import { Exclude } from 'class-transformer';
import { OrganizationEntity } from './organization.entity';

@Entity({ name: 'register_players' })
export class RegisterPlayerEntity {
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

  @Column({
    nullable: true,
    type: 'text',
    default: null,
    name: 'refused_reason',
  })
  public refusedReason: string;

  @ManyToOne(
    () => PlayerEntity,
    player => player.registrations,
  )
  @JoinColumn({ name: 'player_id' })
  public player: PlayerEntity;

  @ManyToOne(
    () => OrganizationEntity,
    organization => organization.registeredPlayers,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationEntity;

  @ManyToOne(
    () => ChampionshipEntity,
    championship => championship.registeredPlayers,
  )
  @JoinColumn({ name: 'championship_id' })
  public championship: ChampionshipEntity;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  public updatedAt: Date;
}
