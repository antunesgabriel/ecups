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
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash, compare, getRounds } from 'bcryptjs';

import { AddressEntity } from './address.entity';
import { RoleEntity } from './role.entity';

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
}
