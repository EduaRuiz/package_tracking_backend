import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IUpdateShipmentDto } from 'src/domain/dto';

export class UpdateShipmentDto implements IUpdateShipmentDto {
  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  originAddress?: string;

  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  destinationAddress?: string;

  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  statusId?: string;
}
