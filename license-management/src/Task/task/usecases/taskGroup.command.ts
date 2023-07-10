import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskGroupEntity } from "../persistance/task-group.entity";
import { TaskCheckListResponse } from "./taskCheckList.response";
import { TaskGroup } from "../domain/task_group";

export class CreateTaskGroupCommands{
    // @ApiProperty()
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

    static fromCommands(createTaskGroupCommands: CreateTaskGroupCommands): TaskGroup {
        const taskGroup: TaskGroup = new TaskGroup()
        taskGroup.id = createTaskGroupCommands?.id
        taskGroup.name = createTaskGroupCommands?.name
        taskGroup.serviceDetailId = createTaskGroupCommands?.serviceDetailId
        taskGroup.isDeleted = createTaskGroupCommands.isDeleted
       

        taskGroup.createdAt = createTaskGroupCommands.createdAt
        taskGroup.createdBy = createTaskGroupCommands.createdBy
        taskGroup.deletedAt = createTaskGroupCommands.deletedAt
        taskGroup.deletedBy = createTaskGroupCommands.deletedBy
        taskGroup.updatedAt = createTaskGroupCommands.updatedAt
        taskGroup.updatedBy = createTaskGroupCommands.updatedBy
        return taskGroup;
    }
    
}
export class UpdateTaskGroupCommands{
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

    static fromCommands(updateTaskGroupCommands: UpdateTaskGroupCommands): TaskGroup {
        const taskGroup: TaskGroup = new TaskGroup()
        taskGroup.id = updateTaskGroupCommands?.id
        taskGroup.name = updateTaskGroupCommands?.name
        taskGroup.serviceDetailId = updateTaskGroupCommands?.serviceDetailId
        taskGroup.isDeleted = updateTaskGroupCommands.isDeleted
       

        taskGroup.createdAt = updateTaskGroupCommands.createdAt
        taskGroup.createdBy = updateTaskGroupCommands.createdBy
        taskGroup.deletedAt = updateTaskGroupCommands.deletedAt
        taskGroup.deletedBy = updateTaskGroupCommands.deletedBy
        taskGroup.updatedAt = updateTaskGroupCommands.updatedAt
        taskGroup.updatedBy = updateTaskGroupCommands.updatedBy
        return taskGroup;
    }
    
}