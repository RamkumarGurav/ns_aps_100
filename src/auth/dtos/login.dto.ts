import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  isEmail,
  minLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password length must be atleast 8 characters' })
  password: string;
}
