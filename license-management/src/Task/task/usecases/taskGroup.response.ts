import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskGroupEntity } from "../persistance/task-group.entity";
import { TaskCheckListResponse } from "./taskCheckList.response";
import { TaskGroup } from "../domain/task_group";

export class TaskGroupResponse{
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    serviceDetailId: string; 
    @ApiProperty()
    isDeleted: string;

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

    static fromEntity(taskGroupEntity: TaskGroupEntity): TaskGroupResponse {
        const taskGroupResponse: TaskGroupResponse = new TaskGroupResponse()
        taskGroupResponse.id = taskGroupEntity.id
        taskGroupResponse.name = taskGroupEntity?.name
        taskGroupResponse.serviceDetailId = taskGroupEntity?.serviceDetailId
        taskGroupResponse.isDeleted = taskGroupEntity.isDeleted
       

        taskGroupResponse.createdAt = taskGroupEntity.createdAt
        taskGroupResponse.createdBy = taskGroupEntity.createdBy
        taskGroupResponse.deletedAt = taskGroupEntity.deletedAt
        taskGroupResponse.deletedBy = taskGroupEntity.deletedBy
        taskGroupResponse.updatedAt = taskGroupEntity.updatedAt
        taskGroupResponse.updatedBy = taskGroupEntity.updatedBy
        return taskGroupResponse;
    }
    static fromDomain(taskGroup: TaskGroup): TaskGroupResponse {
        const taskGroupResponse: TaskGroupResponse = new TaskGroupResponse()
        taskGroupResponse.id = taskGroup.id
        taskGroupResponse.name = taskGroup?.name
        taskGroupResponse.serviceDetailId = taskGroup?.serviceDetailId
        taskGroupResponse.isDeleted = taskGroup?.isDeleted
       

        taskGroupResponse.createdAt = taskGroup.createdAt
        taskGroupResponse.createdBy = taskGroup.createdBy
        taskGroupResponse.deletedAt = taskGroup.deletedAt
        taskGroupResponse.deletedBy = taskGroup.deletedBy
        taskGroupResponse.updatedAt = taskGroup.updatedAt
        taskGroupResponse.updatedBy = taskGroup.updatedBy
        return taskGroupResponse;
    }
}