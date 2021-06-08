import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtInbodyStrategy extends PassportStrategy(Strategy, 'jwt-inbody') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: false,
      secretOrKey:
        '04046a76f7d3d1c8724c59a3191d0efb5071b9413813b7f392a4351b7ee6c9f6',
    });
  }

  async validate(payload: any) {
    return { id: payload.id, nickname: payload.nickname };
  }
}
