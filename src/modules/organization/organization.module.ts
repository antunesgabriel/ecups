import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationRepository } from './organization.repository';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { MemberRepository } from '@modules/member/member.repository';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [
    TypeOrmModule.forFeature([OrganizationRepository, MemberRepository]),
  ],
  exports: [OrganizationService],
})
export class OrganizationModule {}
