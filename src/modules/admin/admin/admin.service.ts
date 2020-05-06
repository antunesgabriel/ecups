import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { AdminCreateDTO } from './dto/admin-create.dto';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { RoleEntity } from '@models/role.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly _adminRepository: AdminRepository,
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async create(adminCreateDTO: AdminCreateDTO): Promise<any> {
    const { key, ...rest } = adminCreateDTO;

    if (!(await this.checkKey(key))) {
      throw new BadRequestException('Key incorreta');
    }

    if (
      await this._adminRepository.findOne({
        email: rest.email,
      })
    ) {
      throw new BadRequestException('Já existe um usuario com este email');
    }

    if (await this._adminRepository.findOne({ nickname: rest.nickname })) {
      throw new BadRequestException('Já existe um usuario com este nickname');
    }

    const role = await this.getRoleAdmin();
    const admin = this._adminRepository.create({ ...rest, role });
    await this._adminRepository.save(admin);

    return { message: 'Admin criado!' };
  }

  async checkKey(key: string): Promise<boolean> {
    const envKey = process.env.CONF_KEY;

    if (!envKey) {
      throw new InternalServerErrorException(
        'A key para criar admin não foi atribuida',
      );
    }

    const accept = await compare(key, envKey);

    return accept;
  }

  async getRoleAdmin(): Promise<RoleEntity> {
    let role = await this._roleRepository.findOne({ role: 'ADMIN' });

    if (!role) {
      role = await this._roleRepository.save({ role: 'ADMIN' });
    }

    return role;
  }
}
