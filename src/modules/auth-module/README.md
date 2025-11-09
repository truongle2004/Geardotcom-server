# Keycloak Authentication Integration

This module provides Keycloak JWT authentication for the NestJS application.

## Features

- ✅ JWT token validation using Keycloak JWKS
- ✅ Authentication guards (global and route-level)
- ✅ Role-based access control (RBAC)
- ✅ Public route decorator
- ✅ User decorator for accessing authenticated user
- ✅ Swagger integration with Bearer Auth

## Configuration

Add the following environment variables to your `.env` file:

```env
KEYCLOAK_REALM=geardotcom
KEYCLOAK_SERVER_URL=http://localhost:9000
KEYCLOAK_CLIENT_ID=geardotcom-client
KEYCLOAK_CLIENT_SECRET=
KEYCLOAK_PUBLIC_KEY=
```

## Usage

### Making Routes Public

Use the `@Public()` decorator to make routes accessible without authentication:

```typescript
import { Public } from '../auth/decorators/public.decorator';

@Get()
@Public()
async getProducts() {
  // This route is accessible without authentication
}
```

### Requiring Authentication

By default, all routes require authentication. The global guard is enabled in `app.module.ts`.

To explicitly require authentication on a route:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Get('profile')
@UseGuards(JwtAuthGuard)
async getProfile() {
  // This route requires authentication
}
```

### Role-Based Access Control

Use the `@Roles()` decorator with `RolesGuard`:

```typescript
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Get('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
async getAdminData() {
  // This route requires 'admin' role
}
```

### Accessing User Information

Use the `@User()` decorator to access the authenticated user:

```typescript
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from '../auth/strategies/keycloak.strategy';

@Get('profile')
async getProfile(@User() user: JwtPayload) {
  const userId = user.sub;
  const email = user.email;
  const roles = user.realm_access?.roles || [];
  
  return { userId, email, roles };
}
```

Or access specific fields:

```typescript
@Get('user-id')
async getUserId(@User('sub') userId: string) {
  return { userId };
}
```

## Swagger Testing

1. Start your application
2. Go to `http://localhost:3000/api`
3. Click "Authorize" button at the top
4. Enter your JWT token (from Keycloak)
5. Click "Authorize"
6. Now you can test protected endpoints

## Getting a Token from Keycloak

### Using Keycloak Admin Console

1. Go to `http://localhost:9000`
2. Login with admin credentials (admin/admin)
3. Go to your realm → Clients → geardotcom-client
4. Use the client credentials or test with a user

### Using cURL

```bash
# Get token using password grant
curl -X POST "http://localhost:9000/realms/geardotcom/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=geardotcom-client" \
  -d "username=your-username" \
  -d "password=your-password" \
  -d "grant_type=password"
```

### Using Postman

1. Create a new request
2. Method: POST
3. URL: `http://localhost:9000/realms/geardotcom/protocol/openid-connect/token`
4. Body: x-www-form-urlencoded
5. Add:
   - `client_id`: geardotcom-client
   - `username`: your-username
   - `password`: your-password
   - `grant_type`: password

## Testing Authentication

### Test Public Endpoint (No Auth Required)

```bash
curl http://localhost:3000/api/v1/sale/products
```

### Test Protected Endpoint (Auth Required)

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/auth/profile
```

### Test Role-Based Endpoint

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/v1/admin/endpoint
```

## Architecture

```
src/modules/auth/
├── auth.module.ts              # Auth module definition
├── auth.service.ts              # Auth utility service
├── auth.controller.ts           # Auth endpoints (profile, health)
├── strategies/
│   └── keycloak.strategy.ts     # Passport JWT strategy for Keycloak
├── guards/
│   ├── jwt-auth.guard.ts        # JWT authentication guard
│   └── roles.guard.ts           # Role-based access control guard
├── decorators/
│   ├── public.decorator.ts      # Mark routes as public
│   ├── roles.decorator.ts       # Define required roles
│   └── user.decorator.ts        # Access authenticated user
└── middleware/
    └── keycloak.middleware.ts   # Optional middleware for logging
```

## Keycloak Setup

1. Start Keycloak using docker-compose:
   ```bash
   docker-compose up -d keycloak
   ```

2. Access Keycloak Admin Console: `http://localhost:9000`

3. Login with admin credentials (configured in docker-compose.yml)

4. Create/Import realm:
   - Realm name: `geardotcom`
   - Client ID: `geardotcom-client`
   - Client should be `public` or `confidential` based on your needs

5. Configure roles in the realm (e.g., `user`, `admin`)

## Troubleshooting

### "Invalid or missing token" error

- Check that the token is valid and not expired
- Verify Keycloak is running and accessible
- Check that the issuer URL matches your Keycloak realm

### "Unable to retrieve public key" error

- Ensure Keycloak is running
- Check network connectivity to Keycloak
- Verify the JWKS endpoint is accessible: `http://localhost:9000/realms/geardotcom/protocol/openid_connect/certs`

### "Insufficient permissions" error

- Verify the user has the required roles in Keycloak
- Check that roles are in the `realm_access.roles` claim
- Ensure the `@Roles()` decorator matches the role names in Keycloak

