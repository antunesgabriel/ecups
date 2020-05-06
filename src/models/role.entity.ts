import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  roleId: number;

  @Column({ nullable: false, type: 'varchar' })
  role: string;

  @OneToMany(
    () => UserEntity,
    user => user.role,
  )
  users: UserEntity[];
}
