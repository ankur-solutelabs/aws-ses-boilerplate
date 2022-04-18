import { IsString, IsNotEmpty } from 'class-validator';

export class UserEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
