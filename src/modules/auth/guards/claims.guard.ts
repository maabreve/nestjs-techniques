import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ClaimsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const routeClaims = this.reflector.get<string[]>(
      'claims',
      context.getHandler(),
    );

    const userClaims = ['read:items']// context.getArgs()[0].user.claims;
    if (!routeClaims) {
      return true;
    }

    const hasPermission = () =>
      routeClaims.every(routePermission =>
        userClaims.includes(routePermission),
      );

    return hasPermission();
  }
}