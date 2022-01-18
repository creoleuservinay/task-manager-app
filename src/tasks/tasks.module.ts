import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleWare } from './middleware/logger.middleware';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(TasksController);
  }
}
