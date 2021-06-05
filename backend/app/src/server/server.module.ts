import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ServerService],
  controllers: [ServerController],
  imports: [UserModule],
  exports: [ServerService],
})
export class ServerModule {}
