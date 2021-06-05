import { Module } from '@nestjs/common';
import { SocialDataService } from './social-data.service';
import { SocialDataController } from './social-data.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SocialDataService],
  controllers: [SocialDataController],
  imports: [UserModule],
})
export class SocialDataModule {}
