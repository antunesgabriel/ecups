import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class MemberCreateDTO {
  @IsNotEmpty({ message: 'Informe o primeiro nome' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Informe o sobrenome' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Informe um email' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Informe sua senha' })
  @IsString()
  @Length(6, 10, {
    message: 'Sua senha deve conter no minimo 6 a 10 caracters',
  })
  password: string;
}
