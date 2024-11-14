import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configService } from '@shared/config/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getCustomKey('JWT_SECRET'),
    });
  }

  public async validate(payload: any) {
    return { id: payload.sub, exp: payload.exp };
  }
}
