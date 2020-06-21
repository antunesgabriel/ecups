import { Response } from 'express';
import { AddressService } from './address.service';
import { AddressDTO } from './dto/address.dto';
import { IUser } from '@utils/user.interface';
export declare class AddressController {
    private readonly _addressService;
    constructor(_addressService: AddressService);
    store(address: AddressDTO, res: Response, user: IUser): Promise<Response>;
}
