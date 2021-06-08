import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthJwtInbodyGuard extends AuthGuard('jwt-inbody') {}
