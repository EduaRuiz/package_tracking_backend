import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IUpdateStatusDto } from 'src/domain/dto';

export class UpdateStatusDto implements IUpdateStatusDto {
  @IsOptional()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  _id?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}
