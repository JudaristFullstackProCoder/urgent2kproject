import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserAuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const admin = request?.session?.admin;
    const user = request?.session?.user;
    if (!!user || !!admin) {
      return true;
    }
    return user ? true : false;
  }
}
