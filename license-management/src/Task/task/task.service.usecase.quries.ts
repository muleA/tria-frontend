/* eslint-disable prettier/prettier */
import {  Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';
import { TaskRepository } from './persistance/task.repository ';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './persistance/task.entity';
import { Repository } from "typeorm";
import { TaskResponse } from './usecases/task.response';
@Injectable()
export class TaskServiceQuries {
    private logger = new Logger("TaskService")
    constructor(
        @InjectRepository(TaskEntity)
       private taskRepository:Repository<TaskEntity>,
    ){}
    async fecthTasks(): Promise<TaskResponse[]> {
        const result = await this.taskRepository.find();
        if (!result) {
            throw new NotFoundException(`There is no Task !!`);
        }
        return result.map((element) => TaskResponse.fromEntity(element))
    }
    async getTaskById(taskId:string): Promise<TaskResponse> {
        const result = await this.taskRepository.findOneBy({id:taskId});
        if (!result) {
            throw new NotFoundException(`There is no Task !!`);
        }
        return  TaskResponse.fromEntity(result)
    }
}
