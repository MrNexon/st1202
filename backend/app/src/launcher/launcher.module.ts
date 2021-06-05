import { Module } from '@nestjs/common';
import { LauncherService } from './launcher.service';
import { LauncherController } from './launcher.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [LauncherService],
  controllers: [LauncherController],
  imports: [UserModule],
})
export class LauncherModule {}
