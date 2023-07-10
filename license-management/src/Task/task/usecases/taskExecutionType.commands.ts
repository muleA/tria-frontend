import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskGroupEntity } from "../persistance/task-group.entity";
import { TaskCheckListResponse } from "./taskCheckList.response";
import { TaskGroup } from "../domain/task_group";
import { TaskExecutionType } from "../domain/task_xecution_type";
import { TaskExecutionTypeEntity } from "../persistance/task-execution-type.entity";

export class CreateTaskExecutionTypeCommand{
    // @ApiProperty()
    id: string;
    @ApiProperty()
    attribute: string;
    @ApiProperty()
    description: string; 
    @ApiProperty()
    method: string; 
    @ApiProperty()
    taskId: string; 
    @ApiProperty()

    createdAt: Date
    // @ApiProperty()
    createdBy: string
    // @ApiProperty()
    updatedAt: Date
    // @ApiProperty()
    updatedBy: string
    // @ApiProperty()
    deletedAt: Date
    // @ApiProperty()
    deletedBy: string

    static fromCommands(createTaskExecutionTypeCommand: CreateTaskExecutionTypeCommand): TaskExecutionType {
        const taskExecutionType: TaskExecutionType = new TaskExecutionType()
        taskExecutionType.id = createTaskExecutionTypeCommand?.id
        taskExecutionType.attribute = createTaskExecutionTypeCommand?.attribute
        taskExecutionType.description = createTaskExecutionTypeCommand?.description
        taskExecutionType.method = createTaskExecutionTypeCommand?.method
       

        taskExecutionType.createdAt = createTaskExecutionTypeCommand.createdAt
        taskExecutionType.createdBy = createTaskExecutionTypeCommand.createdBy
        taskExecutionType.deletedAt = createTaskExecutionTypeCommand.deletedAt
        taskExecutionType.deletedBy = createTaskExecutionTypeCommand.deletedBy
        taskExecutionType.updatedAt = createTaskExecutionTypeCommand.updatedAt
        taskExecutionType.updatedBy = createTaskExecutionTypeCommand.updatedBy
        return taskExecutionType;
    }
    static toTaskExecutionTypeEntity(taskExecutionType: TaskExecutionType):  TaskExecutionTypeEntity {
        const taskExecutionTypeEntity: TaskExecutionTypeEntity = new TaskExecutionTypeEntity()
        taskExecutionTypeEntity.id = taskExecutionType.id
        taskExecutionTypeEntity.attribute = taskExecutionType?.attribute
        taskExecutionTypeEntity.description = taskExecutionType.description
        taskExecutionTypeEntity.method = taskExecutionType?.method
        taskExecutionTypeEntity.taskId = taskExecutionType?.taskId


        taskExecutionTypeEntity.createdAt = taskExecutionType.createdAt
        taskExecutionTypeEntity.createdBy = taskExecutionType.createdBy
        taskExecutionTypeEntity.deletedAt = taskExecutionType.deletedAt
        taskExecutionTypeEntity.deletedBy = taskExecutionType.deletedBy
        taskExecutionTypeEntity.updatedAt = taskExecutionType.updatedAt
        taskExecutionTypeEntity.updatedBy = taskExecutionType.updatedBy
        return taskExecutionTypeEntity
    }
    
}
export class UpdateTaskExecutionTypeCommand{
    @ApiProperty()
    id: string;
    @ApiProperty()
    attribute: string;
    @ApiProperty()
    description: string; 
    @ApiProperty()
    method: string; 
    @ApiProperty()

    createdAt: Date
    // @ApiProperty()
    createdBy: string
    // @ApiProperty()
    updatedAt: Date
    // @ApiProperty()
    updatedBy: string
    // @ApiProperty()
    deletedAt: Date
    // @ApiProperty()
    deletedBy: string

    static fromCommands(updateTaskExecutionTypeCommand: UpdateTaskExecutionTypeCommand): TaskExecutionType {
        const taskExecutionType: TaskExecutionType = new TaskExecutionType()
        taskExecutionType.id = updateTaskExecutionTypeCommand?.id
        taskExecutionType.attribute = updateTaskExecutionTypeCommand?.attribute
        taskExecutionType.description = updateTaskExecutionTypeCommand?.description
        taskExecutionType.method = updateTaskExecutionTypeCommand?.method
       

        taskExecutionType.createdAt = updateTaskExecutionTypeCommand.createdAt
        taskExecutionType.createdBy = updateTaskExecutionTypeCommand.createdBy
        taskExecutionType.deletedAt = updateTaskExecutionTypeCommand.deletedAt
        taskExecutionType.deletedBy = updateTaskExecutionTypeCommand.deletedBy
        taskExecutionType.updatedAt = updateTaskExecutionTypeCommand.updatedAt
        taskExecutionType.updatedBy = updateTaskExecutionTypeCommand.updatedBy
        return taskExecutionType;
    }
    
}