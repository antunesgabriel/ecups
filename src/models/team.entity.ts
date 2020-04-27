import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { PlayerEntity } from './player.entity';
import { ChampionshipEntity } from './championship.entity';

@Entity({ name: 'teams' })
export class TeamEntity {
  @PrimaryGeneratedColumn({ name: 'team_id' })
  public teamId: number;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  public name: string;

  @Column({ nullable: false, type: 'varchar', name: 'warcry' })
  public warCry: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  public shield: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: null })
  public updatedAt: Date;

  // Relationships

  @OneToOne(
    () => PlayerEntity,
    player => player.leaderOf,
    { eager: true },
  )
  @JoinColumn({ name: 'leader_id' })
  public leader: PlayerEntity;

  @OneToMany(
    () => PlayerEntity,
    player => player.team,
    { eager: true },
  )
  public members: PlayerEntity[];

  @ManyToMany(
    () => ChampionshipEntity,
    championship => championship.teams,
  )
  public championships: ChampionshipEntity[];
}
