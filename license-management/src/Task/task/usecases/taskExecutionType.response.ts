import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskGroupEntity } from "../persistance/task-group.entity";
import { TaskCheckListResponse } from "./taskCheckList.response";
import { TaskGroup } from "../domain/task_group";
import { TaskExecutionType } from "../domain/task_xecution_type";
import { TaskExecutionTypeEntity } from "../persistance/task-execution-type.entity";

export class TaskExecutionTypeResponse{
    @ApiProperty()
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

    static fromEntity(taskExecutionTypeEntity: TaskExecutionTypeEntity): TaskExecutionTypeResponse {
        const taskExecutionTypeResponse: TaskExecutionTypeResponse = new TaskExecutionTypeResponse()
        taskExecutionTypeResponse.id = taskExecutionTypeEntity.id
        taskExecutionTypeResponse.attribute = taskExecutionTypeEntity?.attribute
        taskExecutionTypeResponse.description = taskExecutionTypeEntity?.description
        taskExecutionTypeResponse.method = taskExecutionTypeEntity?.method
        taskExecutionTypeResponse.taskId = taskExecutionTypeEntity?.taskId
       

        taskExecutionTypeResponse.createdAt = taskExecutionTypeEntity.createdAt
        taskExecutionTypeResponse.createdBy = taskExecutionTypeEntity.createdBy
        taskExecutionTypeResponse.deletedAt = taskExecutionTypeEntity.deletedAt
        taskExecutionTypeResponse.deletedBy = taskExecutionTypeEntity.deletedBy
        taskExecutionTypeResponse.updatedAt = taskExecutionTypeEntity.updatedAt
        taskExecutionTypeResponse.updatedBy = taskExecutionTypeEntity.updatedBy
        return taskExecutionTypeResponse;
    }
    static fromDomain(taskExecutionType: TaskExecutionType): TaskExecutionTypeResponse {
        const taskExecutionTypeResponse: TaskExecutionTypeResponse = new TaskExecutionTypeResponse()
        taskExecutionTypeResponse.id = taskExecutionType.id
        taskExecutionTypeResponse.attribute = taskExecutionType?.attribute
        taskExecutionTypeResponse.description = taskExecutionType?.description
        taskExecutionTypeResponse.method = taskExecutionType?.method
        taskExecutionTypeResponse.taskId = taskExecutionType?.taskId
       

        taskExecutionTypeResponse.createdAt = taskExecutionType.createdAt
        taskExecutionTypeResponse.createdBy = taskExecutionType.createdBy
        taskExecutionTypeResponse.deletedAt = taskExecutionType.deletedAt
        taskExecutionTypeResponse.deletedBy = taskExecutionType.deletedBy
        taskExecutionTypeResponse.updatedAt = taskExecutionType.updatedAt
        taskExecutionTypeResponse.updatedBy = taskExecutionType.updatedBy
        return taskExecutionTypeResponse;
    }
}