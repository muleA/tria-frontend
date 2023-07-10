import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";

export class TaskCheckListResponse{
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string; 
    @ApiProperty()
    IsMandatory: string; 
    @ApiProperty()
    TaskID: string;

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

    static fromEntity(taskCheckListEntity: TaskCheckListEntity): TaskCheckListResponse {
        const taskCheckListResponse: TaskCheckListResponse = new TaskCheckListResponse()
        taskCheckListResponse.id = taskCheckListEntity.id
        taskCheckListResponse.TaskID = taskCheckListEntity?.TaskID
        taskCheckListResponse.description = taskCheckListEntity?.description
        taskCheckListResponse.name = taskCheckListEntity.name
        taskCheckListResponse.IsMandatory = taskCheckListEntity?.IsMandatory
       

        taskCheckListResponse.createdAt = taskCheckListEntity.createdAt
        taskCheckListResponse.createdBy = taskCheckListEntity.createdBy
        taskCheckListResponse.deletedAt = taskCheckListEntity.deletedAt
        taskCheckListResponse.deletedBy = taskCheckListEntity.deletedBy
        taskCheckListResponse.updatedAt = taskCheckListEntity.updatedAt
        taskCheckListResponse.updatedBy = taskCheckListEntity.updatedBy
        return taskCheckListResponse;
    }
    static fromDomain(taskCheckList: TaskCheckList): TaskCheckListResponse {
        const taskCheckListResponse: TaskCheckListResponse = new TaskCheckListResponse()
        taskCheckListResponse.id = taskCheckList.id
        taskCheckListResponse.TaskID = taskCheckList?.TaskID
        taskCheckListResponse.description = taskCheckList?.description
        taskCheckListResponse.name = taskCheckList.name
        taskCheckListResponse.IsMandatory = taskCheckList?.IsMandatory
       

        taskCheckListResponse.createdAt = taskCheckList.createdAt
        taskCheckListResponse.createdBy = taskCheckList.createdBy
        taskCheckListResponse.deletedAt = taskCheckList.deletedAt
        taskCheckListResponse.deletedBy = taskCheckList.deletedBy
        taskCheckListResponse.updatedAt = taskCheckList.updatedAt
        taskCheckListResponse.updatedBy = taskCheckList.updatedBy
        return taskCheckListResponse;
    }
}