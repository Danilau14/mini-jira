import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : '',
  )
  declare name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : '',
  )
  declare lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.toLowerCase().trim() : '',
  )
  declare email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : '',
  )
  declare password: string;
}
