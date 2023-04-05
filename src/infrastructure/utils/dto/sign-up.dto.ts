import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ISignUpDto } from 'src/domain/dto';

export class SignUpDto implements ISignUpDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Matches(new RegExp(/^[a-zA-Z0-9_-]{20}$/g), {
    message: 'FirebaseId is not valid',
  })
  firebaseId: string;

  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

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
  password: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNumberString()
  @IsDefined()
  @MinLength(7)
  @MaxLength(10)
  document: string;

  @IsString()
  @IsNumberString()
  @IsDefined()
  @MinLength(7)
  @MaxLength(10)
  phone: string;
}
