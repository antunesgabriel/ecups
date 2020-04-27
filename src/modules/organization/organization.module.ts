import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationRepository } from './organization.repository';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { MemberService } from '@modules/member/member.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [TypeOrmModule.forFeature([OrganizationRepository]), MemberService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
