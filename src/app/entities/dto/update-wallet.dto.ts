import { IsString, MaxLength, IsNumber } from 'class-validator';

export class UpdateWalletDto {

  @IsString()
  @MaxLength(25)
  readonly name: string;

  @IsNumber()
  readonly amount: number;

}
