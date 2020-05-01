import { IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';

export class RegisterUpdateDTO {
  @IsNotEmpty()
  @IsBoolean({
    message:
      'Tipo de resposta inválida, este campo só pode ser verdadeiro ou falso',
  })
  confirmedRegister: boolean;

  @IsString({ message: 'Tipo de dado inválido, este campo espera um texto' })
  @IsOptional()
  refusedReason: string;
}
