import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { UserModule } from '@modules/user/user.module';

@Module({
  providers: [AddressService],
  controllers: [AddressController],
  imports: [TypeOrmModule.forFeature([AddressRepository]), UserModule],
})
export class AddressModule {}
