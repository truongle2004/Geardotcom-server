import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from './decorators/user.decorator';
import { Public } from './decorators/public.decorator';
import type { JwtPayload } from './strategies/keycloak.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@User() user: JwtPayload) {
    return {
      userId: user.sub,
      email: user.email,
      username: user.preferred_username,
      roles: user.realm_access?.roles || [],
    };
  }

  @Get('health')
  @Public()
  @ApiOperation({ summary: 'Auth service health check' })
  healthCheck() {
    return {
      status: 'ok',
      service: 'auth',
      timestamp: new Date().toISOString(),
    };
  }
}
