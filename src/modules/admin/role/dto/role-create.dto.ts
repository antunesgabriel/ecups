import { IsNotEmpty, IsString } from 'class-validator';

export class RoleCreateDTO {
  @IsNotEmpty({ message: 'Forneça um nome para função' })
  @IsString()
  role: string;
}
