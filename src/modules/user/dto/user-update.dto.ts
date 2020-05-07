import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserUpdateDTO {
  @IsNotEmpty({ message: 'Forneça um email' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  oldPassword: string;

  @IsNotEmpty({ message: 'Forneça um nome' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Forneça uma sobrenome' })
  @IsString()
  surname: string;

  @IsNotEmpty({ message: 'Forneça uma nickname' })
  @IsString()
  nickname: string;
}
