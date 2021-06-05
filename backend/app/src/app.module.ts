import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServerModule } from './server/server.module';
import { ContentModule } from './contents/content.module';
import { SocialDataModule } from './social-data/social-data.module';
import { LauncherModule } from './launcher/launcher.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ServerModule,
    ContentModule,
    SocialDataModule,
    LauncherModule,
    ScheduleModule.forRoot(),
    TaskModule,
  ],
  providers: [],
})
export class AppModule {}
