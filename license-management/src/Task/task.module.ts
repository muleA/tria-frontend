/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { MailerModule } from '@nestjs-modules/mailer';
import { TaskController } from './task/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task/persistance/task.entity';
import { TaskExecutionMethodsVarationEntity } from './task/persistance/task-execution-methods-varation.entity';
import { TaskExecutionTypeEntity } from './task/persistance/task-execution-type.entity';
import { TaskGroupEntity } from './task/persistance/task-group.entity';
import { TaskCheckListEntity } from './task/persistance/taskchecklist.entity';
import { TaskServiceCommands } from './task/task.service.usecase.commands';
import { TaskServiceQuries } from './task/task.service.usecase.quries';
import { TaskRepository } from './task/persistance/task.repository ';
@Module({
  imports:[TypeOrmModule.forFeature([
    TaskEntity,
    TaskExecutionMethodsVarationEntity,
    TaskExecutionTypeEntity,
    TaskGroupEntity,
    TaskCheckListEntity
  ])],
  controllers: [TaskController],
  providers: [TaskServiceCommands,TaskServiceQuries,TaskRepository],
  exports:[TaskRepository]
})
export class Task { }
