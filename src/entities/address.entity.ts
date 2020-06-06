import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn({ name: 'address_id' })
  addressId: number;

  @Column({ nullable: false, type: 'varchar' })
  cep: string;

  @Column({ nullable: false, type: 'varchar' })
  street: string;

  @Column({ nullable: true, type: 'text' })
  complement: string;

  @Column({ nullable: false, type: 'varchar' })
  district: string;

  @Column({ nullable: false, type: 'varchar' })
  state: string;

  @Column({ nullable: true, type: 'varchar' })
  number: string;

  // Relacionamento
  @OneToOne(
    () => UserEntity,
    user => user.address,
  )
  user: UserEntity;
}
