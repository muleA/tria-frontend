import { ApiProperty } from "@nestjs/swagger";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskExecutionMethodsVaration } from "../domain/task_execution_methods_varation";
import { TaskGroup } from "../domain/task_group";
import { TaskExecutionType } from "../domain/task_xecution_type";
import { Task } from "../domain/task";
import { CreateTaskCheckListCommands, UpdateTaskCheckListCommands } from "./taskCheckList.commands";
import { CreateTaskExecutionMethodsVarationCommands, UpdateTaskExecutionMethodsVarationCommands } from "./taskExecutionMethodsVaration.commands";
import { UpdateTaskGroupCommands } from "./taskGroup.command";
import { UpdateTaskExecutionTypeCommand } from "./taskExecutionType.commands";

export class CreateTaskCommand {
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
    // @ApiProperty()
    // checkLists: TaskCheckList[]; 
    // @ApiProperty()
    // taskExecutionMethodsVarations: TaskExecutionMethodsVaration[]; 
    // @ApiProperty()
    // taskGroup: TaskGroup[]; 
    // @ApiProperty()
    // taskExecutionType: TaskExecutionType[];

    
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

    static fromCommands(createTaskCommand: CreateTaskCommand): Task {
        const task: Task = new Task();
        task.id = createTaskCommand?.id
        task.taskname = createTaskCommand?.taskname
        task.description = createTaskCommand?.description
        task.basline = createTaskCommand?.basline
        task.metric = createTaskCommand?.metric
        task.requireUserInput = createTaskCommand?.requireUserInput
        task.taskGroupID=createTaskCommand?.taskGroupID
        task.taskAssignmentOption=createTaskCommand?.taskAssignmentOption
        task.isPullable=createTaskCommand?.isPullable
        task.taskHandlerType=createTaskCommand?.taskHandlerType
        task.isInWorkFlow=createTaskCommand?.isInWorkFlow
        task.taskGroupID=createTaskCommand?.taskGroupID
        task.stage=createTaskCommand?.stage
        task.serviceDetailId=createTaskCommand?.serviceDetailId

        // task.checkLists=task?.checkLists.map((element)=>TaskCheckListResponse.fromDomain(element))
        // task.taskExecutionMethodsVarations=task?.taskExecutionMethodsVarations.map((element)=>TaskExecutionMethodsVarationResponse.fromDomain(element))
        // task.taskExecutionType=task?.taskExecutionType.map((element)=>TaskExecutionTypeResponse.fromDomain(element))
        // task.taskGroup=task?.taskGroup.map((element)=>TaskGroupResponse.fromDomain(element))

        task.createdBy = createTaskCommand?.createdBy
        task.updatedAt = createTaskCommand?.updatedAt
        task.updatedBy = createTaskCommand?.updatedBy
        task.deletedAt = createTaskCommand?.deletedAt
        task.deletedBy = createTaskCommand?.deletedBy
        return task;
    }
}
export class UpdateTaskCommand {
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
    checkLists: UpdateTaskCheckListCommands[]; 
    @ApiProperty()
    taskExecutionMethodsVarations: UpdateTaskExecutionMethodsVarationCommands[]; 
    @ApiProperty()
    taskGroup: UpdateTaskGroupCommands[]; 
    @ApiProperty()
    taskExecutionType: UpdateTaskExecutionTypeCommand[];

    
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

    static fromCommands(createTaskCommand: CreateTaskCommand): Task {
        const task: Task = new Task();
        task.id = createTaskCommand?.id
        task.taskname = createTaskCommand?.taskname
        task.description = createTaskCommand?.description
        task.basline = createTaskCommand?.basline
        task.metric = createTaskCommand?.metric
        task.requireUserInput = createTaskCommand?.requireUserInput
        task.taskGroupID=createTaskCommand?.taskGroupID
        task.taskAssignmentOption=createTaskCommand?.taskAssignmentOption
        task.isPullable=createTaskCommand?.isPullable
        task.taskHandlerType=createTaskCommand?.taskHandlerType
        task.isInWorkFlow=createTaskCommand?.isInWorkFlow
        task.taskGroupID=createTaskCommand?.taskGroupID
        task.stage=createTaskCommand?.stage
        task.serviceDetailId=createTaskCommand?.serviceDetailId

        task.checkLists=task?.checkLists?.map((element)=>UpdateTaskCheckListCommands.fromCommands(element))
        task.taskExecutionMethodsVarations=task?.taskExecutionMethodsVarations?.map((element)=>UpdateTaskExecutionMethodsVarationCommands.fromCommands(element))
        task.taskExecutionType=task?.taskExecutionType?.map((element)=>UpdateTaskExecutionTypeCommand.fromCommands(element))
        task.taskGroup=task?.taskGroup?.map((element)=>UpdateTaskGroupCommands.fromCommands(element))

        task.createdBy = createTaskCommand?.createdBy
        task.updatedAt = createTaskCommand?.updatedAt
        task.updatedBy = createTaskCommand?.updatedBy
        task.deletedAt = createTaskCommand?.deletedAt
        task.deletedBy = createTaskCommand?.deletedBy
        return task;
    }
}