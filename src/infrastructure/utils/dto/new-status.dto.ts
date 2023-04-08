import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { INewStatusDto } from 'src/domain/dto';

export class NewStatusDto implements INewStatusDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
}
