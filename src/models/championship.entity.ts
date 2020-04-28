import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { PlayerEntity } from './player.entity';
import { TeamEntity } from './team.entity';

@Entity({ name: 'championships' })
export class ChampionshipEntity {
  @PrimaryGeneratedColumn({ name: 'championship_id' })
  public championshipId: number;

  @Column({ nullable: false, type: 'varchar' })
  public name: string;

  @Column({ nullable: false, type: 'text' })
  public description: string;

  @Column({ nullable: false, type: 'text' })
  public rules: string;

  @Column({ nullable: false, name: 'registrations_star', type: 'timestamp' })
  public registrationsStart: Date;

  @Column({ nullable: false, name: 'registrations_end', type: 'timestamp' })
  public registrationsEnd: Date;

  @Column({ nullable: false, type: 'timestamp' })
  public start: Date;

  @Column({ nullable: false, name: 'for_teams', default: true })
  public forTeams: boolean;

  @Column({ nullable: false, default: 0, type: 'float' })
  public rate: number;

  @Column({ nullable: false, default: true, type: 'boolean' })
  public active: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: null })
  public updatedAt: Date;

  //Relationships

  @ManyToOne(
    () => OrganizationEntity,
    organization => organization.championships,
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationEntity;

  @ManyToMany(
    () => PlayerEntity,
    player => player.championships,
  )
  @JoinTable({ name: 'championships_players' })
  public players: PlayerEntity[];

  @ManyToMany(
    () => TeamEntity,
    team => team.championships,
  )
  @JoinTable({ name: 'championships_teams' })
  public teams: TeamEntity[];
}
