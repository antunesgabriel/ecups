import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamEntity } from './team.entity';
import { ChampionshipEntity } from './championship.entity';
import { Exclude } from 'class-transformer';
import { OrganizationEntity } from './organization.entity';

@Entity({ name: 'register_teams' })
export class RegisterTeamEntity {
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
    type: 'text',
    default: null,
    name: 'refused_reason',
  })
  public refusedReason: string;

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

  @ManyToOne(
    () => OrganizationEntity,
    organization => organization.registeredTeams,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationEntity;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  public updatedAt: Date;
}
