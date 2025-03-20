import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUserInterface } from '../../auth/interfaces/request-with-user.interface';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdmin = this.reflector.getAllAndOverride<boolean>('isAdmin', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isAdmin) return true;

    const request: RequestWithUserInterface = context
      .switchToHttp()
      .getRequest();

    if (request.user?.isAdmin !== true) {
      throw new ForbiddenException('You are not admin');
    }

    return request.user.isAdmin;
  }
}
