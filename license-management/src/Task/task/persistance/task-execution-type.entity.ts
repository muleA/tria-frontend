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
import { TaskEntity } from './task.entity';

  @Entity('task_execution_type')
  export class TaskExecutionTypeEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({name:"attribute"})
    attribute: string;
    @Column({name:"description"})
    description: string; 
    @Column({name:"method"})
    method: string; 
    @Column({ name: "task_id" })
    taskId: string;
    @JoinColumn({ name: 'task_id' })
    @ManyToOne(
      () => TaskEntity,
      (taskEntity) => taskEntity.checkLists,
      {
        orphanedRowAction: 'delete',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    )
    tasks: TaskEntity;
    // @OneToMany(
    //     () => CheckListEntity,
    //     (checkListEntity) => checkListEntity.task,
    //     { cascade: true },
    //   )
    // checkLists: CheckListEntity[]; 
    // @OneToMany(
    //     () => TaskExecutionMethodsVarationEntity,
    //     (taskExecutionMethodsVarations) => taskExecutionMethodsVarations.task,
    //     { cascade: true },
    //   )
    //   taskExecutionMethodsVarations: TaskExecutionMethodsVarationEntity[]; 

    // @OneToMany(
    //     () => TaskGroupEntity,
    //     (taskGroup) => taskGroup.task,
    //     { cascade: true },
    //   )
    //   taskGroup: TaskGroupEntity[]; 
    // @OneToMany(
    //     () => TaskMilestonesEntity,
    //     (taskMilestones) => taskMilestones.task,
    //     { cascade: true },
    //   )
    //   taskMilestones: TaskMilestonesEntity[]; 
   
  }
  