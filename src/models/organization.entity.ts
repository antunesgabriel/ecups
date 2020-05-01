import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { MemberEntity } from './member.entity';
import { ChampionshipEntity } from './championship.entity';
import { Exclude } from 'class-transformer';
import { RegisterPlayerEntity } from './registerPlayer.entity';
import { RegisterTeamEntity } from './registerTeam.entity';

@Entity({ name: 'organizations' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn({ name: 'organization_id' })
  public organizationId: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  public name: string;

  @Column({ nullable: false, type: 'varchar', unique: true })
  public email: string;

  @Column({ nullable: false, default: true, type: 'boolean' })
  public active: boolean;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  public nickname: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  public brand: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: null })
  @Exclude()
  public updatedAt: Date;

  // Relationships

  @OneToMany(
    () => MemberEntity,
    member => member.organization,
  )
  public members: MemberEntity[];

  @OneToMany(
    () => ChampionshipEntity,
    championship => championship.organization,
  )
  public championships: string;

  @OneToMany(
    () => RegisterPlayerEntity,
    register => register.organization,
  )
  public registeredPlayers: RegisterPlayerEntity[];

  @OneToMany(
    () => RegisterTeamEntity,
    register => register.organization,
  )
  public registeredTeams: RegisterTeamEntity[];
}
