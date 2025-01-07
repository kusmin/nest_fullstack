import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'Email do usuário', example: 'user@example.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ description: 'Senha do usuário', example: 'strongPassword123' })
  password: string;
}
