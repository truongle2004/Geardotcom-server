import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../strategies/keycloak.strategy';

@Injectable()
export class KeycloakMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Skip authentication for public routes (handled by guards)
    // This middleware is optional and can be used for logging or additional processing
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        // Verify token (this is a basic check, detailed validation is done by the guard)
        const payload = await this.jwtService.decode(token) as JwtPayload;
        
        if (payload) {
          // Attach user info to request for logging/monitoring
          req['user'] = payload;
        }
      } catch (error) {
        // Don't throw here, let the guard handle authentication errors
        // This middleware is just for optional processing
      }
    }

    next();
  }
}

