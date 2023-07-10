/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context:ExecutionContext) {
    const { userRole } = context.switchToHttp().getRequest().body;
    if (userRole) {
      context.switchToHttp().getRequest().body.userRole = userRole;
  
    }
    return super.canActivate(context);
  }
}
