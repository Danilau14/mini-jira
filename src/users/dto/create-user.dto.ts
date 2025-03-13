import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : '',
  )
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : '',
  )
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toLowerCase().trim() : '',
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : '',
  )
  password: string;
}
