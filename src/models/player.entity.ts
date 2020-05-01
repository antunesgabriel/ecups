import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { hash, compare, getRounds } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { TeamEntity } from './team.entity';

import { RegisterPlayerEntity } from './registerPlayer.entity';

@Entity({ name: 'players' })
export class PlayerEntity {
  @PrimaryGeneratedColumn({ name: 'player_id' })
  public playerId: number;

  @Column({ name: 'firstname', nullable: false, type: 'varchar' })
  public firstName: string;

  @Column({ name: 'lastname', nullable: false, type: 'varchar' })
  public lastName: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  public email: string;

  @Column({ nullable: false, type: 'varchar' })
  @Exclude()
  public password: string;

  @Column({ name: 'nickname', type: 'varchar', nullable: false, unique: true })
  public nickName: string;

  @Column({ name: 'birth_date', type: 'date', nullable: false })
  public birthDate: Date;

  @Column({ name: 'cpf', type: 'varchar', nullable: true })
  public cpf: string;

  @Column({ name: 'rg_number', type: 'varchar', nullable: true })
  public rgNumber: string;

  @Column({ name: 'rg_emitter', type: 'varchar', nullable: true })
  public rgEmitter: string;

  @Column({ name: 'rg_uf', type: 'varchar', nullable: true })
  public rgUf: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  public active: boolean;

  @Column({ type: 'varchar', nullable: true, default: null })
  public avatar: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: null })
  @Exclude()
  public updatedAt: Date;

  // Methods

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const rounds = getRounds(this.password);
    if (!rounds) {
      const SALT = Number(process.env.CONF_PASS_SALT);
      this.password = await hash(this.password, SALT);
    }
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  // Relationships

  @ManyToOne(
    () => TeamEntity,
    team => team.members,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'team_id' })
  public team: TeamEntity;

  @OneToOne(
    () => TeamEntity,
    team => team.leader,
  )
  public leaderOf: TeamEntity;

  @OneToMany(
    () => RegisterPlayerEntity,
    register => register.player,
  )
  public registrations: RegisterPlayerEntity[];
}
