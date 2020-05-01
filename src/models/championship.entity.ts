import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { RegisterTeamEntity } from './registerTeam.entity';
import { RegisterPlayerEntity } from './registerPlayer.entity';

@Entity({ name: 'championships' })
export class ChampionshipEntity {
  @PrimaryGeneratedColumn({ name: 'championship_id' })
  public championshipId: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  public name: string;

  @Column({ nullable: false, type: 'text' })
  public description: string;

  @Column({ nullable: false, type: 'text' })
  public rules: string;

  @Column({
    nullable: false,
    name: 'registrations_star',
    type: 'timestamp',
  })
  public registrationsStart: Date;

  @Column({
    nullable: true,
    name: 'registrations_end',
    type: 'timestamp',
  })
  public registrationsEnd: Date;

  @Column({ nullable: true, type: 'timestamp' })
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

  @OneToMany(
    () => RegisterTeamEntity,
    registerTeam => registerTeam.championship,
  )
  public registeredTeams: RegisterTeamEntity[];

  @OneToMany(
    () => RegisterPlayerEntity,
    registerPlayer => registerPlayer.championship,
  )
  public registeredPlayers: RegisterPlayerEntity[];
}
