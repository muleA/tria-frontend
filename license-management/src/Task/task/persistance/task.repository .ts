/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { TaskEntity } from "./task.entity";
import { ITaskRepository } from "../domain/task.repository.interface";
import { Task } from "../domain/task";
import { TaskCheckList } from "../domain/taskc_heckList";
import { TaskCheckListEntity } from "./taskchecklist.entity";
import { TaskGroup } from "../domain/task_group";
import { TaskGroupEntity } from "./task-group.entity";
import { TaskExecutionTypeEntity } from "./task-execution-type.entity";
import { TaskExecutionType } from "../domain/task_xecution_type";
import { TaskExecutionMethodsVarationEntity } from "./task-execution-methods-varation.entity";
import { TaskExecutionMethodsVaration } from "../domain/task_execution_methods_varation";

export class TaskRepository  implements ITaskRepository {
    constructor(
        // @InjectRepository(TaskEntity)
        // private taskRepository: Repository<TaskEntity>,
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
        // @InjectRepository(EmployeeRoleEntity)
        // private employeeRoleRepository: Repository<EmployeeRoleEntity>,
    ) {
        //  super()
    }
    async insertTask(task: Task): Promise<any> {
        const taskEntity = this.toTaskEntity(task)
        console.log('changed to entity',taskEntity)
        // const result = await this.taskRepository.save(taskEntity)
        console.log('the result is ')
        // return result ? this.toTask(result) : null;
    }
    async updateTask(task: Task): Promise<Task> {
        const taskEntity = this.toTaskEntity(task)
        const result = await this.taskRepository.save(taskEntity)
        console.log('dddddddddddddddddddd')
        return result ? this.toTask(result) : null;
    }
    async findAll(): Promise<Task[]> {
        const result = await this.taskRepository.find()
        return result ? result.map((element) => this.toTask(element)) : null
    }
    async findById(id: string): Promise<Task> {
        try {
            const result = await this.taskRepository.find({ where: { id: id }, relations: ['checkLists','taskExecutionMethodsVarations','taskGroup','taskExecutionType'] })
            console.log('taskEntity entity ', result)
            return this.toTask(result[0])
        } catch (error) {
            Logger.log(` From with Id ${id} is not found`)
        }

    }
    async deleteById(id: string): Promise<boolean> {
        const result = await this.taskRepository.delete(id)
        if (result.affected > 0) return true;
        return false;
    }
    async softDeleteTask(taskId: string): Promise<boolean> {
        const result = await this.taskRepository.softDelete(taskId)
        if (result.affected > 0) return true;
        return false;
    }
    async restoreTask(taskId: string): Promise<boolean> {
        const result = await this.taskRepository.restore(taskId)
        if (result.affected > 0) return true;
        return false;
    }
    // Transforming 
    private toTaskEntity(task: Task): TaskEntity {
        const taskEntity: TaskEntity = new TaskEntity()
        console.log('goint to change to TaskEntity : ',task)
        taskEntity.id=task?.id
        taskEntity.isInWorkFlow = task?.isInWorkFlow
        taskEntity.isPullable = task?.isPullable
        taskEntity.stage = task?.stage
        taskEntity.taskAssignmentOption = task?.taskAssignmentOption
        taskEntity.taskGroupID = task?.taskGroupID
        taskEntity.basline=task?.basline
        taskEntity.description=task?.description
        taskEntity.metric=task?.metric
        taskEntity.requireUserInput=task?.requireUserInput
        taskEntity.serviceDetailId=task?.serviceDetailId
        taskEntity.taskname=task?.taskname

        // taskEntity.checkLists=task?.checkLists?.map((element)=>this.toTaskCheckListEntity(element))
        // taskEntity.taskGroup=task?.taskGroup?.map((element)=>this.toTaskGroupEntity(element))
        // taskEntity.taskExecutionType=task?.taskExecutionType?.map((element)=>this.toTaskExecutionTypeEntity(element))
        // taskEntity.taskExecutionMethodsVarations=task?.taskExecutionMethodsVarations?.map((element)=>this.toTaskExecutionMethodsVarationsEntity(element))

        taskEntity.createdAt = task?.createdAt
        taskEntity.createdBy = task?.createdBy
        taskEntity.deletedAt = task?.deletedAt
        taskEntity.deletedBy = task?.deletedBy
        taskEntity.updatedAt = task?.updatedAt
        taskEntity.updatedBy = task?.updatedBy
        return taskEntity
    }
    private toTask(taskEntity: TaskEntity): Task {
        const task: Task = new Task()
        task.isInWorkFlow = taskEntity?.isInWorkFlow
        task.isPullable = taskEntity?.isPullable
        task.stage = taskEntity?.stage
        task.taskAssignmentOption = taskEntity.taskAssignmentOption
        task.taskGroupID = taskEntity?.taskGroupID
        task.basline=taskEntity?.basline
        task.description=taskEntity?.description
        task.id=taskEntity?.id
        task.metric=taskEntity?.metric
        task.requireUserInput=taskEntity?.requireUserInput
        task.serviceDetailId=taskEntity?.serviceDetailId
        task.taskname=taskEntity?.taskname

        task.checkLists=taskEntity?.checkLists?.map((element)=>this.toTaskCheckList(element))
        task.taskGroup=taskEntity?.taskGroup?.map((element)=>this.toTaskGroup(element))
        task.taskExecutionType=taskEntity?.taskExecutionType?.map((element)=>this.toTaskExecutionType(element))
        task.taskExecutionMethodsVarations=taskEntity?.taskExecutionMethodsVarations?.map((element)=>this.toTaskExecutionMethodsVarations(element))

        task.createdAt = taskEntity?.createdAt
        task.createdBy = taskEntity?.createdBy
        task.deletedAt = taskEntity?.deletedAt
        task.deletedBy = taskEntity?.deletedBy
        task.updatedAt = taskEntity?.updatedAt
        task.updatedBy = taskEntity?.updatedBy
        return task
    }

    private toTaskCheckList(taskCheckListEntity: TaskCheckListEntity): TaskCheckList {
        const taskCheckList: TaskCheckList = new TaskCheckList()
        taskCheckList.id = taskCheckListEntity.id
        taskCheckList.TaskID = taskCheckListEntity?.TaskID
        taskCheckList.description = taskCheckListEntity?.description
        taskCheckList.name = taskCheckListEntity.name
        taskCheckList.IsMandatory = taskCheckListEntity?.IsMandatory
       

        taskCheckList.createdAt = taskCheckListEntity.createdAt
        taskCheckList.createdBy = taskCheckListEntity.createdBy
        taskCheckList.deletedAt = taskCheckListEntity.deletedAt
        taskCheckList.deletedBy = taskCheckListEntity.deletedBy
        taskCheckList.updatedAt = taskCheckListEntity.updatedAt
        taskCheckList.updatedBy = taskCheckListEntity.updatedBy
        return taskCheckList
    }
    private toTaskCheckListEntity(taskCheckList: TaskCheckList):  TaskCheckListEntity {
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

    private toTaskGroup(taskGroupEntity: TaskGroupEntity): TaskGroup {
        const taskGroup: TaskGroup = new TaskGroup()
        taskGroup.id = taskGroupEntity.id
        taskGroup.name = taskGroupEntity?.name
        taskGroup.serviceDetailId = taskGroupEntity.serviceDetailId
        taskGroup.isDeleted = taskGroupEntity?.isDeleted

       

        taskGroup.createdAt = taskGroupEntity.createdAt
        taskGroup.createdBy = taskGroupEntity.createdBy
        taskGroup.deletedAt = taskGroupEntity.deletedAt
        taskGroup.deletedBy = taskGroupEntity.deletedBy
        taskGroup.updatedAt = taskGroupEntity.updatedAt
        taskGroup.updatedBy = taskGroupEntity.updatedBy
        return taskGroup
    }
    private toTaskGroupEntity(taskGroup: TaskGroup):  TaskGroupEntity {
        const taskGroupEntity: TaskGroupEntity = new TaskGroupEntity()
        taskGroupEntity.id = taskGroup.id
        taskGroupEntity.name = taskGroup?.name
        taskGroupEntity.serviceDetailId = taskGroup.serviceDetailId
        taskGroupEntity.isDeleted = taskGroup?.isDeleted

        taskGroupEntity.createdAt = taskGroup.createdAt
        taskGroupEntity.createdBy = taskGroup.createdBy
        taskGroupEntity.deletedAt = taskGroup.deletedAt
        taskGroupEntity.deletedBy = taskGroup.deletedBy
        taskGroupEntity.updatedAt = taskGroup.updatedAt
        taskGroupEntity.updatedBy = taskGroup.updatedBy
        return taskGroupEntity
    }

    private toTaskExecutionType(taskGroupEntity: TaskExecutionTypeEntity): TaskExecutionType {
        const taskExecutionType: TaskExecutionType = new TaskExecutionType()
        taskExecutionType.id = taskGroupEntity.id
        taskExecutionType.attribute = taskGroupEntity?.attribute
        taskExecutionType.description = taskGroupEntity.description
        taskExecutionType.method = taskGroupEntity?.method
        taskExecutionType.taskId = taskGroupEntity?.taskId


        taskExecutionType.createdAt = taskGroupEntity.createdAt
        taskExecutionType.createdBy = taskGroupEntity.createdBy
        taskExecutionType.deletedAt = taskGroupEntity.deletedAt
        taskExecutionType.deletedBy = taskGroupEntity.deletedBy
        taskExecutionType.updatedAt = taskGroupEntity.updatedAt
        taskExecutionType.updatedBy = taskGroupEntity.updatedBy
        return taskExecutionType
    }
    private toTaskExecutionTypeEntity(taskExecutionType: TaskExecutionType):  TaskExecutionTypeEntity {
        const taskExecutionTypeEntity: TaskExecutionTypeEntity = new TaskExecutionTypeEntity()
        taskExecutionTypeEntity.id = taskExecutionType.id
        taskExecutionTypeEntity.attribute = taskExecutionType?.attribute
        taskExecutionTypeEntity.description = taskExecutionType.description
        taskExecutionTypeEntity.method = taskExecutionType?.method
        taskExecutionTypeEntity.taskId = taskExecutionType?.taskId


        taskExecutionTypeEntity.createdAt = taskExecutionType.createdAt
        taskExecutionTypeEntity.createdBy = taskExecutionType.createdBy
        taskExecutionTypeEntity.deletedAt = taskExecutionType.deletedAt
        taskExecutionTypeEntity.deletedBy = taskExecutionType.deletedBy
        taskExecutionTypeEntity.updatedAt = taskExecutionType.updatedAt
        taskExecutionTypeEntity.updatedBy = taskExecutionType.updatedBy
        return taskExecutionTypeEntity
    }

    private toTaskExecutionMethodsVarations(taskExecutionMethodsVarationEntity: TaskExecutionMethodsVarationEntity): TaskExecutionMethodsVaration {
        const taskExecutionMethodsVaration: TaskExecutionMethodsVaration = new TaskExecutionMethodsVaration()
        taskExecutionMethodsVaration.id = taskExecutionMethodsVarationEntity.id
        taskExecutionMethodsVaration.formBuilderFormID = taskExecutionMethodsVarationEntity?.formBuilderFormID
        taskExecutionMethodsVaration.isActive = taskExecutionMethodsVarationEntity.isActive
        taskExecutionMethodsVaration.description = taskExecutionMethodsVarationEntity?.description
        taskExecutionMethodsVaration.taskId = taskExecutionMethodsVarationEntity?.taskId

        taskExecutionMethodsVaration.createdAt = taskExecutionMethodsVarationEntity.createdAt
        taskExecutionMethodsVaration.createdBy = taskExecutionMethodsVarationEntity.createdBy
        taskExecutionMethodsVaration.deletedAt = taskExecutionMethodsVarationEntity.deletedAt
        taskExecutionMethodsVaration.deletedBy = taskExecutionMethodsVarationEntity.deletedBy
        taskExecutionMethodsVaration.updatedAt = taskExecutionMethodsVarationEntity.updatedAt
        taskExecutionMethodsVaration.updatedBy = taskExecutionMethodsVarationEntity.updatedBy
        return taskExecutionMethodsVaration
    }
    private toTaskExecutionMethodsVarationsEntity(taskExecutionMethodsVaration: TaskExecutionMethodsVaration): TaskExecutionMethodsVarationEntity {
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
    // private toFormAttribute(formEntity: FormAttributeEntity): FormAttribute {
    //     const fromAttribute: FormAttribute = new FormAttribute()
    //     fromAttribute.id = formEntity.id
    //     fromAttribute.name = formEntity?.name
    //     fromAttribute.dependsOn = formEntity?.dependsOn
    //     fromAttribute.description = formEntity?.description
    //     fromAttribute.code = formEntity?.code
    //     fromAttribute.status = formEntity?.status
    //     fromAttribute.displayTo = formEntity?.displayTo
    //     fromAttribute.dependsWhen = formEntity?.dependsOn
    //     fromAttribute.validation = formEntity?.validation
    //     fromAttribute.regEx = formEntity?.regEx
    //     fromAttribute.dataTypeDescription = formEntity?.dataTypeDescription
    //     fromAttribute.group = formEntity?.group
    //     fromAttribute.agentOnlyFormAttibute = formEntity?.agentOnlyFormAttibute
    //     fromAttribute.isDeleted = formEntity?.isDeleted
    //     fromAttribute.isCalculated = formEntity?.isCalculated
    //     fromAttribute.isReadOnly = formEntity?.isReadOnly
    //     fromAttribute.isSystemForm = formEntity?.isSystemForm
    //     fromAttribute.isRequired = formEntity?.isRequired
    //     fromAttribute.isDefault = formEntity?.isDefault
    //     fromAttribute.isVariable = formEntity?.isVariable
    //     fromAttribute.isDefaultEditableExceptOrder = formEntity?.isDefaultEditableExceptOrder
    //     fromAttribute.isCaseClasification = formEntity?.isCaseClasification
    //     fromAttribute.canCutomerEdit = formEntity?.canCutomerEdit
    //     fromAttribute.canCaseWorkerEdit = formEntity?.canCaseWorkerEdit
    //     fromAttribute.feildOrder = formEntity?.feildOrder
    //     fromAttribute.pages = formEntity?.pages
    //     fromAttribute.formId = formEntity?.formId

    //     fromAttribute.createdAt = formEntity.createdAt
    //     fromAttribute.createdBy = formEntity.createdBy
    //     fromAttribute.deletedAt = formEntity.deletedAt
    //     fromAttribute.deletedBy = formEntity.deletedBy
    //     fromAttribute.updatedAt = formEntity.updatedAt
    //     fromAttribute.updatedBy = formEntity.updatedBy

    //     return fromAttribute;
    // }

    // private toFormAttributeEntity(fromAttribute: FormAttribute): FormAttributeEntity {
    //     const formAttributeEntity: FormAttributeEntity = new FormAttributeEntity()

    //     formAttributeEntity.id = fromAttribute.id
    //     formAttributeEntity.name = fromAttribute?.name
    //     formAttributeEntity.dependsOn = fromAttribute?.dependsOn
    //     formAttributeEntity.description = fromAttribute?.description
    //     formAttributeEntity.code = fromAttribute?.code
    //     formAttributeEntity.status = fromAttribute?.status
    //     formAttributeEntity.displayTo = fromAttribute?.displayTo
    //     formAttributeEntity.dependsWhen = fromAttribute?.dependsOn
    //     formAttributeEntity.validation = fromAttribute?.validation
    //     formAttributeEntity.regEx = fromAttribute?.regEx
    //     formAttributeEntity.dataTypeDescription = fromAttribute?.dataTypeDescription
    //     formAttributeEntity.group = fromAttribute?.group
    //     formAttributeEntity.agentOnlyFormAttibute = fromAttribute?.agentOnlyFormAttibute
    //     formAttributeEntity.isDeleted = fromAttribute?.isDeleted
    //     formAttributeEntity.isCalculated = fromAttribute?.isCalculated
    //     formAttributeEntity.isReadOnly = fromAttribute?.isReadOnly
    //     formAttributeEntity.isSystemForm = fromAttribute?.isSystemForm
    //     formAttributeEntity.isRequired = fromAttribute?.isRequired
    //     formAttributeEntity.isDefault = fromAttribute?.isDefault
    //     formAttributeEntity.isVariable = fromAttribute?.isVariable
    //     formAttributeEntity.isDefaultEditableExceptOrder = fromAttribute?.isDefaultEditableExceptOrder
    //     formAttributeEntity.isCaseClasification = fromAttribute?.isCaseClasification
    //     formAttributeEntity.canCutomerEdit = fromAttribute?.canCutomerEdit
    //     formAttributeEntity.canCaseWorkerEdit = fromAttribute?.canCaseWorkerEdit
    //     formAttributeEntity.feildOrder = fromAttribute?.feildOrder
    //     formAttributeEntity.pages = fromAttribute?.pages
    //     formAttributeEntity.formId = fromAttribute?.formId

    //     formAttributeEntity.createdAt = fromAttribute.createdAt
    //     formAttributeEntity.createdBy = fromAttribute.createdBy
    //     formAttributeEntity.deletedAt = fromAttribute.deletedAt
    //     formAttributeEntity.deletedBy = fromAttribute.deletedBy
    //     formAttributeEntity.updatedAt = fromAttribute.updatedAt
    //     formAttributeEntity.updatedBy = fromAttribute.updatedBy
    //     return formAttributeEntity
    // }

}