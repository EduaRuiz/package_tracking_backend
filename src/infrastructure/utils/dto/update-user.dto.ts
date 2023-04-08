import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUpdateUserDto } from 'src/domain/dto';

export class UpdateUserDto implements IUpdateUserDto {
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
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsNumberString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(10)
  phone?: string;
}
