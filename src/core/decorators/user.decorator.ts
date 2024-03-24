import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserContext {
  id: string;
}

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserContext => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!user) {
    return { id: null };
  }

  return {
    id: user.id,
  };
});
