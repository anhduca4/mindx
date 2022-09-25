import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

export interface UserIdentity {
  sub: number;
  userId: number;
  username: string;
  isAdmin: boolean;
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();
    return user;
  },
);
