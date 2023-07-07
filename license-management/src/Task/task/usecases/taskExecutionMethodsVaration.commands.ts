import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckListEntity } from "../persistance/taskchecklist.entity";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskExecutionMethodsVarationEntity } from "../persistance/task-execution-methods-varation.entity";
import { TaskExecutionMethodsVaration } from "../domain/task_execution_methods_varation";

export class CreateTaskExecutionMethodsVarationCommands{
    // @ApiProperty()
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

    static fromCommands(createTaskExecutionMethodsVarationCommands: CreateTaskExecutionMethodsVarationCommands): TaskExecutionMethodsVaration{
        const taskExecutionMethodsVaration: TaskExecutionMethodsVaration = new TaskExecutionMethodsVaration()
        taskExecutionMethodsVaration.id = createTaskExecutionMethodsVarationCommands?.id
        taskExecutionMethodsVaration.taskId = createTaskExecutionMethodsVarationCommands?.taskId
        taskExecutionMethodsVaration.description = createTaskExecutionMethodsVarationCommands?.description
        taskExecutionMethodsVaration.formBuilderFormID = createTaskExecutionMethodsVarationCommands.formBuilderFormID
        taskExecutionMethodsVaration.isActive = createTaskExecutionMethodsVarationCommands?.isActive
       

        taskExecutionMethodsVaration.createdAt = createTaskExecutionMethodsVarationCommands.createdAt
        taskExecutionMethodsVaration.createdBy = createTaskExecutionMethodsVarationCommands.createdBy
        taskExecutionMethodsVaration.deletedAt = createTaskExecutionMethodsVarationCommands.deletedAt
        taskExecutionMethodsVaration.deletedBy = createTaskExecutionMethodsVarationCommands.deletedBy
        taskExecutionMethodsVaration.updatedAt = createTaskExecutionMethodsVarationCommands.updatedAt
        taskExecutionMethodsVaration.updatedBy = createTaskExecutionMethodsVarationCommands.updatedBy
        return taskExecutionMethodsVaration;
    }
    static toTaskExecutionMethodsVarationsEntity(taskExecutionMethodsVaration: TaskExecutionMethodsVaration): TaskExecutionMethodsVarationEntity {
        const taskExecutionMethodsVarationEntity: TaskExecutionMethodsVarationEntity = new TaskExecutionMethodsVarationEntity()
        taskExecutionMethodsVarationEntity.id = taskExecutionMethodsVaration.id
        taskExecutionMethodsVarationEntity.formBuilderFormID = taskExecutionMethodsVaration?.formBuilderFormID
        taskExecutionMethodsVarationEntity.isActive = taskExecutionMethodsVaration.isActive
        taskExecutionMethodsVarationEntity.description = taskExecutionMethodsVaration?.description
        taskExecutionMethodsVarationEntity.taskId = taskExecutionMethodsVaration?.taskId

        taskExecutionMethodsVarationEntity.createdAt = taskExecutionMethodsVaration.createdAt
        taskExecutionMethodsVarationEntity.createdBy = taskExecutionMethodsVaration.createdBy
        taskExecutionMethodsVarationEntity.deletedAt = taskExecutionMethodsVaration.deletedAt
        taskExecutionMethodsVarationEntity.deletedBy = taskExecutionMethodsVaration.deletedBy
        taskExecutionMethodsVarationEntity.updatedAt = taskExecutionMethodsVaration.updatedAt
        taskExecutionMethodsVarationEntity.updatedBy = taskExecutionMethodsVaration.updatedBy
        return taskExecutionMethodsVarationEntity
    }
}
export class UpdateTaskExecutionMethodsVarationCommands{
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

    static fromCommands(updateTaskExecutionMethodsVarationCommands: UpdateTaskExecutionMethodsVarationCommands): TaskExecutionMethodsVaration{
        const taskExecutionMethodsVaration: TaskExecutionMethodsVaration = new TaskExecutionMethodsVaration()
        taskExecutionMethodsVaration.id = updateTaskExecutionMethodsVarationCommands.id
        taskExecutionMethodsVaration.taskId = updateTaskExecutionMethodsVarationCommands?.taskId
        taskExecutionMethodsVaration.description = updateTaskExecutionMethodsVarationCommands?.description
        taskExecutionMethodsVaration.formBuilderFormID = updateTaskExecutionMethodsVarationCommands.formBuilderFormID
        taskExecutionMethodsVaration.isActive = updateTaskExecutionMethodsVarationCommands?.isActive
       

        taskExecutionMethodsVaration.createdAt = updateTaskExecutionMethodsVarationCommands.createdAt
        taskExecutionMethodsVaration.createdBy = updateTaskExecutionMethodsVarationCommands.createdBy
        taskExecutionMethodsVaration.deletedAt = updateTaskExecutionMethodsVarationCommands.deletedAt
        taskExecutionMethodsVaration.deletedBy = updateTaskExecutionMethodsVarationCommands.deletedBy
        taskExecutionMethodsVaration.updatedAt = updateTaskExecutionMethodsVarationCommands.updatedAt
        taskExecutionMethodsVaration.updatedBy = updateTaskExecutionMethodsVarationCommands.updatedBy
        return taskExecutionMethodsVaration;
    }
    
}