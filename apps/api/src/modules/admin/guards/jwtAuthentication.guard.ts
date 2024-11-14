import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(err: any, payload: any) {
    if (err || !payload) {
      throw err || new UnauthorizedException('Unauthorized');
    }

    if (payload.expiresAt < Date.now()) {
      throw new UnauthorizedException('Unauthorized');
    }

    return payload.id;
  }
}
