import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsDateString,
} from 'class-validator';
export class PlayerCreateDTO {
  @IsNotEmpty({ message: 'Informe seu primeiro nome' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Informe seu sobrenome' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'Informe seu email' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Informe sua senha' })
  @IsString()
  @Length(6, 10, {
    message: 'Sua senha deve conter no minimo 6 a 10 caracters',
  })
  password: string;

  @IsNotEmpty({ message: 'Informe seu nickname' })
  @IsString()
  nickName: string;

  @IsNotEmpty({ message: 'Informe sua data de aniversário' })
  @IsDateString({ message: 'Formato de data inválido' })
  birthDate: string;
}
