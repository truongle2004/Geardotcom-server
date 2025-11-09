import { registerAs } from '@nestjs/config';

export default registerAs('keycloak', () => ({
  realm: process.env.KEYCLOAK_REALM || 'geardotcom',
  serverUrl: process.env.KEYCLOAK_SERVER_URL || 'http://localhost:9000',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'geardotcom-client',
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '',
  issuer: `${process.env.KEYCLOAK_SERVER_URL || 'http://localhost:9000'}/realms/${process.env.KEYCLOAK_REALM || 'geardotcom'}`,
  publicKey: process.env.KEYCLOAK_PUBLIC_KEY || '',
}));

