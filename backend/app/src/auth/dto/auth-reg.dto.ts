import { IsEmail, IsString } from 'class-validator';

export class AuthRegDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  recaptcha_token: string;
}
