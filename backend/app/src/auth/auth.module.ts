import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import {JwtInbodyStrategy} from "./jwt-inbody.strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret:
        '04046a76f7d3d1c8724c59a3191d0efb5071b9413813b7f392a4351b7ee6c9f6',
      signOptions: { expiresIn: '1d' },
    }),
    HttpModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtInbodyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
