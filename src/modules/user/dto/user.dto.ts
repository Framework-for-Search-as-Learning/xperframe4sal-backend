/*
 * Copyright (c) 2026, lapic-ufjf
 * Licensed under The MIT License [see LICENSE for details]
 */

export class GetUserDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  researcher: boolean;
}

export class GetRecoveryPasswordDto {
  id: string;
  recoveryPasswordToken: string;
  recoveryPasswordTokenExpirationDate: Date;
}

export class ForgotPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  email: string;
  token: string;
  password: string;
}
