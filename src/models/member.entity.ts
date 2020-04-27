import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { hash, compare, getRounds } from 'bcryptjs';
import { OrganizationEntity } from './organization.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'members' })
export class MemberEntity {
  @PrimaryGeneratedColumn({ name: 'member_id' })
  public memberId: number;

  @Column({ name: 'firstname', nullable: false, type: 'varchar' })
  public firstName: string;

  @Column({ name: 'lastname', nullable: false, type: 'varchar' })
  public lastName: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  public email: string;

  @Column({ nullable: false, type: 'varchar' })
  @Exclude()
  public password: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  public active: string;

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
      const SALT = Number(process.env.CONF_PASS_SALT_MEMBER);
      this.password = await hash(this.password, SALT);
    }
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  // Relationships
  @ManyToOne(
    () => OrganizationEntity,
    organization => organization.members,
    { eager: true },
  )
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationEntity;
}
