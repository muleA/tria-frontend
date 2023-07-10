/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';
import { TaskRepository } from './persistance/task.repository ';
import { TaskResponse } from './usecases/task.response';
import { CreateTaskCommand, UpdateTaskCommand } from './usecases/task.commands';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './persistance/task.entity';
import { Repository } from "typeorm";
import { CreateTaskGroupCommands, UpdateTaskGroupCommands } from './usecases/taskGroup.command';
import { TaskGroupEntity } from './persistance/task-group.entity';
import { TaskGroupResponse } from './usecases/taskGroup.response';
import { CreateTaskCheckListCommands, UpdateTaskCheckListCommands } from './usecases/taskCheckList.commands';
import { TaskCheckListResponse } from './usecases/taskCheckList.response';
import { CreateTaskExecutionTypeCommand, UpdateTaskExecutionTypeCommand } from './usecases/taskExecutionType.commands';
import { CreateTaskExecutionMethodsVarationCommands, UpdateTaskExecutionMethodsVarationCommands } from './usecases/taskExecutionMethodsVaration.commands';
import { TaskCheckListEntity } from './persistance/taskchecklist.entity';
import { TaskExecutionTypeResponse } from './usecases/taskExecutionType.response';
import { TaskExecutionMethodsVarationResponse } from './usecases/taskExecutionMethodsVaration.response';
import { TaskExecutionMethodsVarationEntity } from './persistance/task-execution-methods-varation.entity';
import { TaskExecutionTypeEntity } from './persistance/task-execution-type.entity';


@Injectable()
export class TaskServiceCommands {
    constructor(
        private tasksRepository: TaskRepository,
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
        @InjectRepository(TaskGroupEntity)
        private taskGroupRepository: Repository<TaskGroupEntity>,
        @InjectRepository(TaskCheckListEntity)
        private taskCheckListRepository: Repository<TaskCheckListEntity>,
        @InjectRepository(TaskExecutionTypeEntity)
        private taskExecutionTypeRepository: Repository<TaskExecutionTypeEntity>,
        @InjectRepository(TaskExecutionMethodsVarationEntity)
        private taskExecutionMethodsVarationRepository: Repository<TaskExecutionMethodsVarationEntity>

    ) { }

    async createTask(
        command: CreateTaskCommand
    ): Promise<TaskResponse> {
        try {

            const taskEntity = CreateTaskCommand.fromCommands(command)

            const result = await this.taskRepository.save(taskEntity)
            console.log('addeded   ', TaskResponse.fromDomain(result))
            return TaskResponse.fromDomain(result)
        } catch (error) {

        }
    }
    async createTaskGroup(
        command: CreateTaskGroupCommands
    ): Promise<TaskGroupResponse> {
        try {

            const taskEntity = CreateTaskGroupCommands.fromCommands(command)

            const result = await this.taskGroupRepository.save(taskEntity)
            console.log('addeded   ', TaskGroupResponse.fromDomain(result))
            return TaskGroupResponse.fromDomain(result)
        } catch (error) {

        }
    }
    async updateTaskGroup(
        command: UpdateTaskGroupCommands
    ): Promise<TaskGroupResponse> {
        try {

            const taskEntity = UpdateTaskGroupCommands.fromCommands(command)

            const result = await this.taskGroupRepository.save(taskEntity)
            // console.log('addeded   ', TaskGroupResponse.fromDomain(result))
            return TaskGroupResponse.fromDomain(result)
        } catch (error) {

        }
    }
    async addTaskCheckList(
        command: CreateTaskCheckListCommands
    ): Promise<TaskResponse> {
        try {
            const task = await this.taskRepository.findOne({ where: { id: command.TaskID }, relations: ['checkLists', 'taskExecutionMethodsVarations', 'taskGroup', 'taskExecutionType'] })

            const taskEntity = CreateTaskCheckListCommands.toTaskCheckListEntity(CreateTaskCheckListCommands.fromCommands(command))
            task.checkLists.push(taskEntity)
            const result = await this.taskRepository.save(task)
            console.log('addeded   ', TaskResponse.fromEntity(result))
            return TaskResponse.fromEntity(result)
        } catch (error) {

        }
    }
    async updateTaskCheckList(
        command: UpdateTaskCheckListCommands
    ): Promise<TaskCheckListResponse> {
        try {
            const taskCheckList = UpdateTaskCheckListCommands.fromCommands(command)
            const task = await this.taskCheckListRepository.save(taskCheckList)
            return TaskCheckListResponse.fromEntity(task)
        } catch (error) {

        }
    }
    async addTaskExecutionType(
        command: CreateTaskExecutionTypeCommand
    ): Promise<TaskResponse> {
        try {
            const task = await this.taskRepository.findOne({ where: { id: command.taskId }, relations: ['checkLists', 'taskExecutionMethodsVarations', 'taskGroup', 'taskExecutionType'] })

            const taskEntity = CreateTaskExecutionTypeCommand.toTaskExecutionTypeEntity(CreateTaskExecutionTypeCommand.fromCommands(command))
            task.taskExecutionType.push(taskEntity)
            const result = await this.taskRepository.save(task)
            console.log('addeded   ', TaskResponse.fromEntity(result))
            return TaskResponse.fromEntity(result)
        } catch (error) {

        }
    }
    async updateTaskExecutionType(
        command: UpdateTaskExecutionTypeCommand
    ): Promise<TaskExecutionTypeResponse> {
        try {
            const task = UpdateTaskExecutionTypeCommand.fromCommands(command)
            const result = await this.taskExecutionTypeRepository.save(task)
            return TaskExecutionTypeResponse.fromDomain(result)
        } catch (error) {

        }
    }
    async addTaskExecutionmethodVariation(
        command: CreateTaskExecutionMethodsVarationCommands
    ): Promise<TaskResponse> {
        try {
            const task = await this.taskRepository.findOne({ where: { id: command.taskId }, relations: ['checkLists', 'taskExecutionMethodsVarations', 'taskGroup', 'taskExecutionType'] })

            const taskEntity = CreateTaskExecutionMethodsVarationCommands.toTaskExecutionMethodsVarationsEntity(CreateTaskExecutionMethodsVarationCommands.fromCommands(command))
            task.taskExecutionMethodsVarations.push(taskEntity)
            const result = await this.taskRepository.save(task)
            console.log('addeded   ', TaskResponse.fromEntity(result))
            return TaskResponse.fromEntity(result)
        } catch (error) {

        }
    }
    async updateTaskExecutionmethodVariation(
        command: UpdateTaskExecutionMethodsVarationCommands
    ): Promise<TaskExecutionMethodsVarationResponse> {
        try {
            const TaskExecutionMethodsVaration = UpdateTaskExecutionMethodsVarationCommands.fromCommands(command)
            const result = await this.taskExecutionMethodsVarationRepository.save(TaskExecutionMethodsVaration)
            return TaskExecutionMethodsVarationResponse.fromEntity(result)
        } catch (error) {

        }
    }
    async updateTask(
        command: UpdateTaskCommand
    ): Promise<TaskResponse> {
        try {

            const taskEntity = CreateTaskCommand.fromCommands(command)
            const result = await this.taskRepository.save(taskEntity)
            console.log('addeded   ', TaskResponse.fromDomain(result))
            return TaskResponse.fromDomain(result)
        } catch (error) {

        }
    }
}
