import { forwardRef, Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
  imports: [forwardRef(() => UserModule)],
})
export class ContentModule {}
