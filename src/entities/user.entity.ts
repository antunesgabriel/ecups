import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash, compare, getRounds } from 'bcryptjs';

import { AddressEntity } from './address.entity';
import { RoleEntity } from './role.entity';
import { LeagueEntity } from './league.entity';
import { TeamEntity } from './team.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  surname: string;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  email: string;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  nickname: string;

  @Column({ nullable: false, select: false, type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ nullable: true, default: null, type: 'text' })
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', insert: false, nullable: true })
  @Exclude()
  updatedAt: Date;

  // Relacionamentos
  @OneToOne(
    () => AddressEntity,
    address => address.user,
    { eager: true },
  )
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
    { eager: true },
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @OneToMany(
    () => LeagueEntity,
    league => league.user,
  )
  leagues: LeagueEntity[];

  @ManyToOne(
    () => TeamEntity,
    team => team.members,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @OneToOne(
    () => TeamEntity,
    team => team.boss,
    { onDelete: 'SET NULL' },
  )
  myTeam: TeamEntity;

  // Metodos
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(pass: string | undefined): Promise<string> {
    const rounds = getRounds(pass || this.password);
    if (!rounds) {
      const SALT = Number(process.env.CONF_PASS_SALT);

      this.password = await hash(pass || this.password, SALT);
      return this.password;
    }
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
