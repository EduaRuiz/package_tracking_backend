import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { IResetPasswordDto } from 'src/domain/dto';

export class ResetPasswordDto implements IResetPasswordDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  userId?: string;

  @IsString()
  @IsDefined()
  @Matches(
    new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/g,
    ),
    {
      message: 'Password is not valid',
    },
  )
  newPassword: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  oldPassword: string;
}
