import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: 'Email do usuário', example: 'user@example.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'strongPassword123',
  })
  password: string;
}
