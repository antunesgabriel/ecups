import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty({ message: 'Informe seu CEP' })
  @IsString()
  cep: string;

  @IsNotEmpty({ message: 'Informe sua rua' })
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsNotEmpty({ message: 'Informe seu bairro' })
  @IsString()
  district: string;

  @IsNotEmpty({ message: 'Informe seu estado' })
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  number: string;
}
