import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';
import { OrganizationModule } from '@modules/organization/organization.module';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
  imports: [TypeOrmModule.forFeature([MemberRepository]), OrganizationModule],
})
export class MemberModule {}
