import {
  ExecutionContext,
  CanActivate,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new ForbiddenException('You are not admin');
    }

    return request.user.role.title === 'admin';
  }
}
