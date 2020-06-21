import { AddressRepository } from './address.repository';
import { UserService } from '@modules/user/user.service';
import { IUser } from '@utils/user.interface';
import { AddressDTO } from './dto/address.dto';
export declare class AddressService {
    private readonly _addressRepository;
    private readonly _userService;
    constructor(_addressRepository: AddressRepository, _userService: UserService);
    save(user: IUser, endereco: AddressDTO): Promise<any>;
    private create;
    private update;
}
