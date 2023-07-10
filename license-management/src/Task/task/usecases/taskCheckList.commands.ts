import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";

export class CreateTaskCheckListCommands{
    // @ApiProperty()
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

    static fromCommands(createTaskCheckListCommands: CreateTaskCheckListCommands): TaskCheckList {
        const taskCheckList: TaskCheckList = new TaskCheckList()
        taskCheckList.id = createTaskCheckListCommands?.id
        taskCheckList.TaskID = createTaskCheckListCommands?.TaskID
        taskCheckList.description = createTaskCheckListCommands?.description
        taskCheckList.name = createTaskCheckListCommands.name
        taskCheckList.IsMandatory = createTaskCheckListCommands?.IsMandatory
       

        taskCheckList.createdAt = createTaskCheckListCommands.createdAt
        taskCheckList.createdBy = createTaskCheckListCommands.createdBy
        taskCheckList.deletedAt = createTaskCheckListCommands.deletedAt
        taskCheckList.deletedBy = createTaskCheckListCommands.deletedBy
        taskCheckList.updatedAt = createTaskCheckListCommands.updatedAt
        taskCheckList.updatedBy = createTaskCheckListCommands.updatedBy
        return taskCheckList;
    }
    static toTaskCheckListEntity(taskCheckList: CreateTaskCheckListCommands):  TaskCheckListEntity {
        const taskCheckListEntity: TaskCheckListEntity = new TaskCheckListEntity()
        taskCheckListEntity.id = taskCheckList.id
        taskCheckListEntity.TaskID = taskCheckList?.TaskID
        taskCheckListEntity.description = taskCheckList?.description
        taskCheckListEntity.name = taskCheckList.name
        taskCheckListEntity.IsMandatory = taskCheckList?.IsMandatory
       

        taskCheckListEntity.createdAt = taskCheckList.createdAt
        taskCheckListEntity.createdBy = taskCheckList.createdBy
        taskCheckListEntity.deletedAt = taskCheckList.deletedAt
        taskCheckListEntity.deletedBy = taskCheckList.deletedBy
        taskCheckListEntity.updatedAt = taskCheckList.updatedAt
        taskCheckListEntity.updatedBy = taskCheckList.updatedBy
        return taskCheckListEntity
    }
   
}
export class UpdateTaskCheckListCommands{
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

    static fromCommands(updateTaskCheckListCommands: UpdateTaskCheckListCommands): TaskCheckList {
        const taskCheckList: TaskCheckList = new TaskCheckList()
        taskCheckList.id = updateTaskCheckListCommands?.id
        taskCheckList.TaskID = updateTaskCheckListCommands?.TaskID
        taskCheckList.description = updateTaskCheckListCommands?.description
        taskCheckList.name = updateTaskCheckListCommands.name
        taskCheckList.IsMandatory = updateTaskCheckListCommands?.IsMandatory
       

        taskCheckList.createdAt = updateTaskCheckListCommands.createdAt
        taskCheckList.createdBy = updateTaskCheckListCommands.createdBy
        taskCheckList.deletedAt = updateTaskCheckListCommands.deletedAt
        taskCheckList.deletedBy = updateTaskCheckListCommands.deletedBy
        taskCheckList.updatedAt = updateTaskCheckListCommands.updatedAt
        taskCheckList.updatedBy = updateTaskCheckListCommands.updatedBy
        return taskCheckList;
    }
    static toTaskCheckListEntity(taskCheckList: CreateTaskCheckListCommands):  TaskCheckListEntity {
        const taskCheckListEntity: TaskCheckListEntity = new TaskCheckListEntity()
        taskCheckListEntity.id = taskCheckList.id
        taskCheckListEntity.TaskID = taskCheckList?.TaskID
        taskCheckListEntity.description = taskCheckList?.description
        taskCheckListEntity.name = taskCheckList.name
        taskCheckListEntity.IsMandatory = taskCheckList?.IsMandatory
       

        taskCheckListEntity.createdAt = taskCheckList.createdAt
        taskCheckListEntity.createdBy = taskCheckList.createdBy
        taskCheckListEntity.deletedAt = taskCheckList.deletedAt
        taskCheckListEntity.deletedBy = taskCheckList.deletedBy
        taskCheckListEntity.updatedAt = taskCheckList.updatedAt
        taskCheckListEntity.updatedBy = taskCheckList.updatedBy
        return taskCheckListEntity
    }
   
}