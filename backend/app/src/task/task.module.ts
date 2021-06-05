import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ServerModule } from '../server/server.module';

@Module({
  providers: [TaskService],
  imports: [ServerModule],
})
export class TaskModule {}
