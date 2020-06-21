import { UserEntity } from './user.entity';
export declare class AddressEntity {
    addressId: number;
    cep: string;
    street: string;
    complement: string;
    district: string;
    state: string;
    number: string;
    user: UserEntity;
}
