import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { IFeedback } from '@interfaces/feedback.interface';
import { RoleRepository } from './role.repository';
import { RoleCreateDTO } from './dto/role-create.dto';
import { RoleUpdateDTO } from './dto/role-update.dto';
import { RoleEntity } from '@models/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async index(options: IPaginationOptions): Promise<Pagination<RoleEntity>> {
    const query = this._roleRepository
      .createQueryBuilder('role')
      .orderBy('role', 'ASC');

    return paginate<RoleEntity>(query, options);
  }

  async create(role: RoleCreateDTO): Promise<IFeedback> {
    const newRole = {
      role: role.role.toUpperCase(),
    };
    if (await this._roleRepository.findOne({ role: newRole.role })) {
      throw new BadRequestException(
        'Uma função com o mesmo nome já foi adcionada',
      );
    }
    await this._roleRepository.save(this._roleRepository.create(newRole));

    return { message: 'Função adcionado a lista com sucesso' };
  }

  async update(roleId: number, role: RoleUpdateDTO): Promise<IFeedback> {
    if (!(await this._roleRepository.findOne({ roleId }))) {
      throw new BadRequestException('A função informado não está cadastrada');
    }

    await this._roleRepository.update(
      { roleId },
      { role: role.role.toUpperCase() },
    );

    return { message: 'Informações de Função atualizadas' };
  }

  async destroy(roleId: number): Promise<IFeedback> {
    if (!(await this._roleRepository.findOne({ roleId }))) {
      throw new BadRequestException('A função informado não está cadastrada');
    }

    await this._roleRepository.delete({ roleId });

    return { message: 'Função excluida com succeso' };
  }

  async findOrCreate(role: string): Promise<RoleEntity> {
    let find = await this._roleRepository.findOne({ role });

    if (!find) {
      find = await this._roleRepository.save(
        this._roleRepository.create({ role }),
      );
    }

    return find;
  }
}
