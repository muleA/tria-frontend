import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskExecutionMethodsVarationEntity } from "../persistance/task-execution-methods-varation.entity";
import { TaskExecutionMethodsVaration } from "../domain/task_execution_methods_varation";

export class TaskExecutionMethodsVarationResponse{
    @ApiProperty()
    id: string;
    @ApiProperty()
    taskId: string;
    @ApiProperty()
    description: string; 
    @ApiProperty()
    formBuilderFormID: string; 
    @ApiProperty()
    isActive: string;

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

    static fromEntity(taskExecutionMethodsVarationEntity: TaskExecutionMethodsVarationEntity): TaskExecutionMethodsVarationResponse {
        const taskExecutionMethodsVarationResponse: TaskExecutionMethodsVarationResponse = new TaskExecutionMethodsVarationResponse()
        taskExecutionMethodsVarationResponse.id = taskExecutionMethodsVarationEntity.id
        taskExecutionMethodsVarationResponse.taskId = taskExecutionMethodsVarationEntity?.taskId
        taskExecutionMethodsVarationResponse.description = taskExecutionMethodsVarationEntity?.description
        taskExecutionMethodsVarationResponse.formBuilderFormID = taskExecutionMethodsVarationEntity.formBuilderFormID
        taskExecutionMethodsVarationResponse.isActive = taskExecutionMethodsVarationEntity?.isActive
       

        taskExecutionMethodsVarationResponse.createdAt = taskExecutionMethodsVarationEntity.createdAt
        taskExecutionMethodsVarationResponse.createdBy = taskExecutionMethodsVarationEntity.createdBy
        taskExecutionMethodsVarationResponse.deletedAt = taskExecutionMethodsVarationEntity.deletedAt
        taskExecutionMethodsVarationResponse.deletedBy = taskExecutionMethodsVarationEntity.deletedBy
        taskExecutionMethodsVarationResponse.updatedAt = taskExecutionMethodsVarationEntity.updatedAt
        taskExecutionMethodsVarationResponse.updatedBy = taskExecutionMethodsVarationEntity.updatedBy
        return taskExecutionMethodsVarationResponse;
    }
    static fromDomain(taskExecutionMethodsVaration: TaskExecutionMethodsVaration): TaskExecutionMethodsVarationResponse {
        const taskExecutionMethodsVarationResponse: TaskExecutionMethodsVarationResponse = new TaskExecutionMethodsVarationResponse()
        taskExecutionMethodsVarationResponse.id = taskExecutionMethodsVaration.id
        taskExecutionMethodsVarationResponse.taskId = taskExecutionMethodsVaration?.taskId
        taskExecutionMethodsVarationResponse.description = taskExecutionMethodsVaration?.description
        taskExecutionMethodsVarationResponse.formBuilderFormID = taskExecutionMethodsVaration.formBuilderFormID
        taskExecutionMethodsVarationResponse.isActive = taskExecutionMethodsVaration?.isActive
       

        taskExecutionMethodsVarationResponse.createdAt = taskExecutionMethodsVaration.createdAt
        taskExecutionMethodsVarationResponse.createdBy = taskExecutionMethodsVaration.createdBy
        taskExecutionMethodsVarationResponse.deletedAt = taskExecutionMethodsVaration.deletedAt
        taskExecutionMethodsVarationResponse.deletedBy = taskExecutionMethodsVaration.deletedBy
        taskExecutionMethodsVarationResponse.updatedAt = taskExecutionMethodsVaration.updatedAt
        taskExecutionMethodsVarationResponse.updatedBy = taskExecutionMethodsVaration.updatedBy
        return taskExecutionMethodsVarationResponse;
    }
}