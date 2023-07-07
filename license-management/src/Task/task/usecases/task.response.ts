import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListResponse } from "./taskCheckList.response";
import { TaskExecutionMethodsVarationResponse } from "./taskExecutionMethodsVaration.response";
import { TaskGroupResponse } from "./taskGroup.response";
import { TaskExecutionTypeResponse } from "./taskExecutionType.response";
import { TaskEntity } from "../persistance/task.entity";
import { Task } from "../domain/task";

export class TaskResponse{
    @ApiProperty()
    id: string;
    @ApiProperty()
    taskname: string;
    @ApiProperty()
    description: string; 
    @ApiProperty()
    basline: string; 
    @ApiProperty()
    metric: string;
    @ApiProperty()
    requireUserInput: string; 
    @ApiProperty()
    taskGroupID: string; 
    @ApiProperty()
    taskAssignmentOption: string;
    @ApiProperty()
    isPullable: string; 
    @ApiProperty()
    taskHandlerType : string; 
    
    @ApiProperty()
    isInWorkFlow: boolean; 
    @ApiProperty()
    stage: boolean;
    @ApiProperty()
    serviceDetailId: boolean;
    @ApiProperty()
    checkLists: TaskCheckListResponse[]; 
    @ApiProperty()
    taskExecutionMethodsVarations: TaskExecutionMethodsVarationResponse[]; 
    @ApiProperty()
    taskGroup: TaskGroupResponse[]; 
    @ApiProperty()
    taskExecutionType: TaskExecutionTypeResponse[];

    @ApiProperty()
    createAt: Date
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

    static fromEntity(taskEntity: TaskEntity): TaskResponse {
        const taskResponse: TaskResponse = new TaskResponse();
        taskResponse.id = taskEntity.id
        taskResponse.taskname = taskEntity.taskname
        taskResponse.description = taskEntity.description
        taskResponse.basline = taskEntity.basline
        taskResponse.metric = taskEntity.metric
        taskResponse.requireUserInput = taskEntity.requireUserInput
        taskResponse.taskGroupID=taskEntity?.taskGroupID
        taskResponse.taskAssignmentOption=taskEntity?.taskAssignmentOption
        taskResponse.isPullable=taskEntity?.isPullable
        taskResponse.taskHandlerType=taskEntity?.taskHandlerType
        taskResponse.isInWorkFlow=taskEntity?.isInWorkFlow
        taskResponse.taskGroupID=taskEntity?.taskGroupID
        taskResponse.stage=taskEntity?.stage
        taskResponse.serviceDetailId=taskEntity?.serviceDetailId

        taskResponse.checkLists=taskEntity?.checkLists?.map((element)=>TaskCheckListResponse.fromEntity(element))
        taskResponse.taskExecutionMethodsVarations=taskEntity?.taskExecutionMethodsVarations?.map((element)=>TaskExecutionMethodsVarationResponse.fromEntity(element))
        taskResponse.taskExecutionType=taskEntity?.taskExecutionType?.map((element)=>TaskExecutionTypeResponse.fromEntity(element))
        taskResponse.taskGroup=taskEntity?.taskGroup?.map((element)=>TaskGroupResponse.fromEntity(element))

        taskResponse.createdBy = taskEntity.createdBy
        taskResponse.updatedAt = taskEntity.updatedAt
        taskResponse.updatedBy = taskEntity.updatedBy
        taskResponse.deletedAt = taskEntity.deletedAt
        taskResponse.deletedBy = taskEntity.deletedBy
        return taskResponse;
    }
    static fromDomain(task: Task): TaskResponse {
        const taskResponse: TaskResponse = new TaskResponse();
        taskResponse.id = task.id
        taskResponse.taskname = task.taskname
        taskResponse.description = task.description
        taskResponse.basline = task.basline
        taskResponse.metric = task.metric
        taskResponse.requireUserInput = task.requireUserInput
        taskResponse.taskGroupID=task?.taskGroupID
        taskResponse.taskAssignmentOption=task?.taskAssignmentOption
        taskResponse.isPullable=task?.isPullable
        taskResponse.taskHandlerType=task?.taskHandlerType
        taskResponse.isInWorkFlow=task?.isInWorkFlow
        taskResponse.taskGroupID=task?.taskGroupID
        taskResponse.stage=task?.stage
        taskResponse.serviceDetailId=task?.serviceDetailId

        taskResponse.checkLists=task?.checkLists?.map((element)=>TaskCheckListResponse.fromDomain(element))
        taskResponse.taskExecutionMethodsVarations=task?.taskExecutionMethodsVarations?.map((element)=>TaskExecutionMethodsVarationResponse.fromDomain(element))
        taskResponse.taskExecutionType=task?.taskExecutionType?.map((element)=>TaskExecutionTypeResponse.fromDomain(element))
        taskResponse.taskGroup=task?.taskGroup?.map((element)=>TaskGroupResponse.fromDomain(element))

        taskResponse.createdBy = task.createdBy
        taskResponse.updatedAt = task.updatedAt
        taskResponse.updatedBy = task.updatedBy
        taskResponse.deletedAt = task.deletedAt
        taskResponse.deletedBy = task.deletedBy
        return taskResponse;
    }
}