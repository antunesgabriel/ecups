import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'teams' })
export class TeamEntity {
  @PrimaryGeneratedColumn({ name: 'team_id' })
  teamId: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  team: string;

  @Column({ nullable: true, type: 'text', default: null })
  shield: string;

  @Column({ nullable: true, default: null, type: 'text' })
  bio: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(
    () => UserEntity,
    user => user.team,
    { onDelete: 'SET NULL' },
  )
  members: UserEntity[];

  @OneToOne(
    () => UserEntity,
    user => user.myTeam,
    { eager: true, onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'user_id' })
  boss: UserEntity;
}
