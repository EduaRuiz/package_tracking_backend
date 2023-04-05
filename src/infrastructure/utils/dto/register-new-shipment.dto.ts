import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { IRegisterNewShipmentDto } from 'src/domain/dto';

export class RegisterNewShipmentDto implements IRegisterNewShipmentDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  originAddress: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  destinationAddress: string;
}
