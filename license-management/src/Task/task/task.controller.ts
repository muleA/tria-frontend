/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountResponse } from 'src/registration/useCases/account.response';
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';
import { AuthGuard } from '@nestjs/passport';
import { TaskServiceCommands } from './task.service.usecase.commands';
import { TaskServiceQuries } from './task.service.usecase.quries';
import { TaskResponse } from './usecases/task.response';
import { CreateTaskCommand, UpdateTaskCommand } from './usecases/task.commands';
import { CreateTaskGroupCommands, UpdateTaskGroupCommands } from './usecases/taskGroup.command';
import { TaskCheckListResponse } from './usecases/taskCheckList.response';
import { TaskGroupResponse } from './usecases/taskGroup.response';
import { CreateTaskCheckListCommands, UpdateTaskCheckListCommands } from './usecases/taskCheckList.commands';
import { CreateTaskExecutionTypeCommand, UpdateTaskExecutionTypeCommand } from './usecases/taskExecutionType.commands';
import { TaskExecutionTypeResponse } from './usecases/taskExecutionType.response';
import { CreateTaskExecutionMethodsVarationCommands, UpdateTaskExecutionMethodsVarationCommands } from './usecases/taskExecutionMethodsVaration.commands';

@Controller('task')
@ApiTags('Task')
export class TaskController {
    constructor(
        private commands: TaskServiceCommands,
        private queries: TaskServiceQuries
    ) {
    }
    @Get("get-tasks")
    @ApiOkResponse({ type: TaskResponse })
    async getTasks() {
        return await this.queries.fecthTasks()
    }
    @Get("get-tasks-by-Id/:taskId")
    @ApiOkResponse({ type: TaskResponse })
    async getTaskById(@Param('taskId')taskId:string) {
        return await this.queries.getTaskById(taskId)
    }
    
    @Post("create-task")
    @ApiOkResponse({ type: TaskResponse })
    async createTask(
        @Body() command: CreateTaskCommand
    ) {
        return await this.commands.createTask(command)
    }
    @Post("create-task-group")
    @ApiOkResponse({ type: TaskGroupResponse })
    async createTaskGroup(
        @Body() command: CreateTaskGroupCommands
    ) {
        return await this.commands.createTaskGroup(command)
    }
    @Post("update-task-group")
    @ApiOkResponse({ type: TaskGroupResponse })
    async updateTaskGroup(
        @Body() command: UpdateTaskGroupCommands
    ) {
        return await this.commands.updateTaskGroup(command)
    }
    @Post("add-task-check-list")
    @ApiOkResponse({ type: TaskCheckListResponse })
    async addTaskCheckList(
        @Body() command: CreateTaskCheckListCommands
    ) {
        return await this.commands.addTaskCheckList(command)
    }
    @Post("update-task-check-list")
    @ApiOkResponse({ type: TaskCheckListResponse })
    async updateTaskCheckList(
        @Body() command: UpdateTaskCheckListCommands
    ) {
        return await this.commands.updateTaskCheckList(command)
    }

    // @Post("update-task-check-list")
    // @ApiOkResponse({ type: TaskCheckListResponse })
    // async updateTaskCheckList(
    //     @Body() command: UpdateTaskCheckListCommands
    // ) {
    //     return await this.commands.updateTaskCheckList(command)
    // }
    @Post("add-task-execution-type")
    @ApiOkResponse({ type: TaskResponse })
    async addTaskExecutionType(
        @Body() command: CreateTaskExecutionTypeCommand
    ) {
        return await this.commands.addTaskExecutionType(command)
    }
    @Post("update-task-execution-type")
    @ApiOkResponse({ type: TaskResponse })
    async updateTaskExecutionType(
        @Body() command: UpdateTaskExecutionTypeCommand
    ) {
        return await this.commands.updateTaskExecutionType(command)
    }
    @Post("add-task-execution-method-variation")
    @ApiOkResponse({ type: TaskResponse })
    async addTaskExecutionmethodVariation(
        @Body() command: CreateTaskExecutionMethodsVarationCommands
    ) {
        return await this.commands.addTaskExecutionmethodVariation(command)
    }
    @Post("update-task-execution-method-variation")
    @ApiOkResponse({ type: TaskResponse })
    async updateTaskExecutionmethodVariation(
        @Body() command: UpdateTaskExecutionMethodsVarationCommands
    ) {
        return await this.commands.updateTaskExecutionmethodVariation(command)
    }
    @Post("update-task")
    @ApiOkResponse({ type: TaskResponse })
    async updateTask(
        @Body() command: UpdateTaskCommand
    ) {
        return await this.commands.updateTask(command)
    }
}
