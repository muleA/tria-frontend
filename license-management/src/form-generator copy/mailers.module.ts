import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesServiceQuries } from './services/service.usecase.quries';
import { ServicesServiceCommands } from './services/services.service.commands';
import { FormRepository } from './persistance/form.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './persistance/form.entity';
import { FormAttributeEntity } from './persistance/attribute.entity';
import { Task } from 'src/Task/task.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
    FormEntity,
    FormAttributeEntity
  ])],
  controllers: [ControllersController],
  providers: [ServicesServiceQuries,ServicesServiceCommands,FormRepository]
})
export class FormGeneratorModule {}
