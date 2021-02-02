import { IsString, MaxLength, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateWalletDto {

  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  readonly amount: number;

}
