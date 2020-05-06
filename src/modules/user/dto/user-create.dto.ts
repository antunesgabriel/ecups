import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty({ message: 'Forneça um email' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Forneça uma senha' })
  @IsString()
  password: string;

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
