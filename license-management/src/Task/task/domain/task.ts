/* eslint-disable prettier/prettier */

import { TaskExecutionMethodsVaration } from "./task_execution_methods_varation";
import { TaskGroup } from "./task_group";
import { TaskExecutionType } from "./task_xecution_type";
import { TaskCheckList } from "./taskc_heckList";


  export class Task{
    id: string;
    taskname: string;
    description: string; 
    basline: string; 
    metric: string;
    requireUserInput: string; 
    taskGroupID: string; 
    taskAssignmentOption: string;
    isPullable: string; 
    taskHandlerType : string; 
    isInWorkFlow: boolean; 
    stage: boolean;
    serviceDetailId: boolean;
    checkLists:TaskCheckList[]
    taskExecutionMethodsVarations:TaskExecutionMethodsVaration[]
    taskGroup:TaskGroup[]
    taskExecutionType:TaskExecutionType[]

    createdAt:Date
    createdBy:string
    deletedAt:Date
    deletedBy:string
    updatedAt:Date
    updatedBy:string
   
    // checkLists: CheckListEntity[]; 
    // taskExecutionMethodsVarations: TaskExecutionMethodsVarationEntity[]; 
    // taskGroup: TaskGroupEntity[]; 
    // taskMilestones: TaskMilestonesEntity[]; 
   
  }
  