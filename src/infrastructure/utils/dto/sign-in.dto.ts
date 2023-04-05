import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { ISignInDto } from 'src/domain/dto';

export class SignInDto implements ISignInDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
