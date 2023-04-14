import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IRegisterNewShipmentDto } from 'src/domain/dto';

export class RegisterNewShipmentDto implements IRegisterNewShipmentDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  userId?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

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
