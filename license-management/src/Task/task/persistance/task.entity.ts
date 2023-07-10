/* eslint-disable prettier/prettier */
import { CommonEntity } from 'src/registration/persistence/common.entity';
import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { TaskCheckListEntity } from './taskchecklist.entity';
import { TaskExecutionMethodsVarationEntity } from './task-execution-methods-varation.entity';
import { TaskGroupEntity } from './task-group.entity';
import { TaskExecutionType } from '../domain/task_xecution_type';
import { TaskExecutionTypeEntity } from './task-execution-type.entity';

  @Entity('task')
  export class TaskEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({name:"taskname"})
    taskname: string;
    @Column({name:"description"})
    description: string; 
    @Column({name:"basline"})
    basline: string; 
    @Column({name:"metric"})
    metric: string;
    @Column({name:"require-user-input"})
    requireUserInput: string; 
    @Column({name:"task-group-id"})
    taskGroupID: string; 
    @Column({name:"task-assignment-option"})
    taskAssignmentOption: string;
    @Column({name:"is-pullable"})
    isPullable: string; 
    @Column({name:"task-handler-type "})
    taskHandlerType : string; 
    
    @Column({name:"is-in-work-flow"})
    isInWorkFlow: boolean; 
    @Column({name:"Stage"})
    stage: boolean;
    @Column({name:"service-detail-id"})
    serviceDetailId: boolean;
    
    @OneToMany(
        () => TaskCheckListEntity,
        (checkListEntity) => checkListEntity.tasks,
        { cascade: true },
      )
    checkLists: TaskCheckListEntity[]; 
    @OneToMany(
        () => TaskExecutionMethodsVarationEntity,
        (taskExecutionMethodsVarations) => taskExecutionMethodsVarations.tasks,
        { cascade: true },
      )
      taskExecutionMethodsVarations: TaskExecutionMethodsVarationEntity[]; 

    @OneToMany(
        () => TaskGroupEntity,
        (taskGroup) => taskGroup.tasks,
        { cascade: true },
      )
      taskGroup: TaskGroupEntity[]; 
    @OneToMany(
        () => TaskExecutionTypeEntity,
        (taskMilestones) => taskMilestones.tasks,
        { cascade: true },
      )
      taskExecutionType: TaskExecutionTypeEntity[]; 
   
  }
  