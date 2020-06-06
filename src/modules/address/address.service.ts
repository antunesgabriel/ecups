import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from './address.repository';
import { UserService } from '@modules/user/user.service';
import { IUser } from '@utils/user.interface';
import { AddressDTO } from './dto/address.dto';
import { AddressEntity } from '@entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository)
    private readonly _addressRepository: AddressRepository,
    private readonly _userService: UserService,
  ) {}

  async save(user: IUser, endereco: AddressDTO): Promise<any> {
    const authUser = await this._userService.findByNickname(user.nickname);

    if (authUser.address) {
      const { address } = authUser;
      return await this.update(address, endereco);
    }

    return await this.create(authUser.nickname, endereco);
  }

  private async create(
    nickname: string,
    data: AddressDTO,
  ): Promise<AddressEntity> {
    const address = await this._addressRepository.save(
      this._addressRepository.create(data),
    );

    await this._userService.addAddress(address, nickname);

    return address;
  }

  private async update(
    address: AddressEntity,
    data: AddressDTO,
  ): Promise<AddressEntity> {
    await this._addressRepository.update(
      {
        addressId: address.addressId,
      },
      { ...data },
    );

    return await this._addressRepository.findOne({
      addressId: address.addressId,
    });
  }
}
