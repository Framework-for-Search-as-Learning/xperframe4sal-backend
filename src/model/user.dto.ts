import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  id: string;

  @ApiProperty({ description: 'First name', example: 'Maria' })
  name: string;

  @ApiProperty({ description: 'Last name', example: 'Silva' })
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'maria.silva@example.com' })
  email: string;

  @ApiProperty({ description: 'Whether the user is a researcher', example: true })
  researcher: boolean;
}

export class GetRecoveryPasswordDto {
  @ApiProperty({ description: 'User ID', example: '64d2f4a8e5f9b20b1c8a9f10' })
  id: string;

  @ApiProperty({ description: 'Recovery token', example: '4c2d1e7a9b0c' })
  recoveryPasswordToken: string;

  @ApiProperty({ description: 'Token expiration date', example: '2026-02-11T10:00:00.000Z' })
  recoveryPasswordTokenExpirationDate: Date;
}

export class ForgotPasswordDto {
  @ApiProperty({ description: 'Email address', example: 'maria.silva@example.com' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ description: 'Email address', example: 'maria.silva@example.com' })
  email: string;

  @ApiProperty({ description: 'Recovery token', example: '4c2d1e7a9b0c' })
  token: string;

  @ApiProperty({ description: 'New password', example: 'StrongPassword123' })
  password: string;
}
