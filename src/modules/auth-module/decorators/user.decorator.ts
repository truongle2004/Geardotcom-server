import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../strategies/keycloak.strategy';

export const User = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext): JwtPayload | any => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    return data ? user?.[data] : user;
  },
);

