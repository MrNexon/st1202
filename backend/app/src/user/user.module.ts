import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ContentModule } from '../contents/content.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
  imports: [forwardRef(() => ContentModule)],
})
export class UserModule {}
