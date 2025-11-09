import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwksClient from 'jwks-rsa';

export interface JwtPayload {
  sub: string; // User ID
  email?: string;
  preferred_username?: string;
  realm_access?: {
    roles?: string[];
  };
  resource_access?: {
    [key: string]: {
      roles?: string[];
    };
  };
  exp?: number;
  iat?: number;
  iss?: string;
}

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    const issuer = configService.get<string>('keycloak.issuer');
    const publicKey = configService.get<string>('keycloak.publicKey');
    const jwksUri = `${issuer}/protocol/openid-connect/certs`;

    const client = jwksClient({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri,
    });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use provider to satisfy StrategyOptions typing and fetch signing key per token
      secretOrKeyProvider: (
        request: any,
        rawJwtToken: string,
        done: (err: any, secret?: string) => void,
      ) => {
        try {
          if (publicKey) {
            return done(null, publicKey);
          }

          const [headerB64] = rawJwtToken.split('.');
          const headerJson = Buffer.from(headerB64, 'base64').toString('utf8');
          const header = JSON.parse(headerJson);
          const kid = header.kid;

          client.getSigningKey(kid, (err, key: any) => {
            if (err) return done(err);
            const signingKey = key.getPublicKey
              ? key.getPublicKey()
              : key.publicKey || key.rsaPublicKey;
            return done(null, signingKey);
          });
        } catch (e) {
          return done(e);
        }
      },
      issuer: issuer,
      algorithms: ['RS256'],
      audience: configService.get<string>('keycloak.clientId'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      preferred_username: payload.preferred_username,
      realm_access: payload.realm_access,
      resource_access: payload.resource_access,
      exp: payload.exp,
      iat: payload.iat,
      iss: payload.iss,
    };
  }
}
