import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class OrganizationCreateDTO {
  @IsNotEmpty({ message: 'Informe o nome da organização' })
  @IsString()
  public name: string;

  @IsNotEmpty({ message: 'Informe o email de contato da organização' })
  @IsEmail()
  public email: string;

  @IsNotEmpty({ message: 'Informe o nome da organização' })
  @IsString()
  @Length(4, 20, {
    message: 'O nick da organização deve ter entre 4 a 20 caracters',
  })
  public nickname: string;
}
