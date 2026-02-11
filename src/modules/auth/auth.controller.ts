import { Req, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Validates credentials and returns a JWT access token.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'StrongPassword123' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'Login successful with JWT token.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Req() req: any) {
    return this.authService.loginWithCredentials(req.user);
  }
}
