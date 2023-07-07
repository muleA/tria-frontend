/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { IEmployeeRepository } from "src/registration/domain/employee/employee.repository.interface";
import { EmployeeRole } from "src/registration/domain/employee/employee-role";
import { Employee } from "src/registration/domain/employee/employee";
import { IFormRepository } from "../domain/employee.repository.interface";
import { FormEntity } from "./form.entity";
import { Form } from "../domain/form";
import { FormAttributeEntity } from "./attribute.entity";
import { FormAttribute } from "../domain/formAttributes";

export class FormRepository implements IFormRepository {
    constructor(
        @InjectRepository(FormEntity)
        private formRepository: Repository<FormEntity>,
        // @InjectRepository(EmployeeRoleEntity)
        // private employeeRoleRepository: Repository<EmployeeRoleEntity>,
    ) {
        //  super()
    }
    async insertForm(form: Form): Promise<Form> {
        const formEntity = this.toFormEntity(form)
        const result = await this.formRepository.save(formEntity)
        return result ? this.toFrom(result) : null;
    }
    async updateForm(form: Form): Promise<Form> {
        const formEntity = this.toFormEntity(form)
        const result = await this.formRepository.save(formEntity)
        return result ? this.toFrom(result) : null;
    }
    async findAll(): Promise<Form[]> {
        const result = await this.formRepository.find()
        return result ? result.map((element) => this.toFrom(element)) : null
    }
    async findById(id: string): Promise<Form> {
        try {
            const result = await this.formRepository.find({ where: { id: id }, relations: ['formAttributes'] })
            console.log('formEntity entity ', result)
            return this.toFrom(result[0])
        } catch (error) {
            Logger.log(` From with Id ${id} is not found`)
        }

    }
    async deleteById(id: string): Promise<boolean> {
        const result = await this.formRepository.delete(id)
        if (result.affected > 0) return true;
        return false;
    }
    async softDeleteForm(formId: string): Promise<boolean> {
        const result = await this.formRepository.softDelete(formId)
        if (result.affected > 0) return true;
        return false;
    }
    async restoreForm(formId: string): Promise<boolean> {
        const result = await this.formRepository.restore(formId)
        if (result.affected > 0) return true;
        return false;
    }
    // Transforming 
    private toFormEntity(form: Form): FormEntity {
        const formEntity: FormEntity = new FormEntity()
        console.log('goint to change to formEntity : ',form)
        formEntity.id = form.id
        formEntity.name = form.name
        formEntity.version = form?.version
        formEntity.isActive = form?.isActive
        formEntity.code = form.code
        formEntity.status = form?.status
        formEntity.isSystemForm = form?.isSystemForm
        formEntity.formAttributes=form?.formAttributes?.map((element)=>this.toFormAttributeEntity(element))

        formEntity.createdAt = form.createdAt
        formEntity.createdBy = form.createdBy
        formEntity.deletedAt = form.deletedAt
        formEntity.deletedBy = form.deletedBy
        formEntity.updatedAt = form.updatedAt
        formEntity.updatedBy = form.updatedBy
        return formEntity
    }
    private toFrom(formEntity: FormEntity): Form {
        const form: Form = new Form()
        form.id = formEntity.id
        form.name = formEntity.name
        form.version = formEntity.version
        form.isActive = formEntity.isActive
        form.code = formEntity.code
        form.status = formEntity.status
        form.isSystemForm = formEntity.isSystemForm
        form.formAttributes=formEntity?.formAttributes?.map((element)=>this.toFormAttribute(element))

        form.createdAt = formEntity.createdAt
        form.createdBy = formEntity.createdBy
        form.deletedAt = formEntity.deletedAt
        form.deletedBy = formEntity.deletedBy
        form.updatedAt = formEntity.updatedAt
        form.updatedBy = formEntity.updatedBy
        return form
    }
    private toFormAttribute(formEntity: FormAttributeEntity): FormAttribute {
        const fromAttribute: FormAttribute = new FormAttribute()
        fromAttribute.id = formEntity.id
        fromAttribute.name = formEntity?.name
        fromAttribute.dependsOn = formEntity?.dependsOn
        fromAttribute.description = formEntity?.description
        fromAttribute.code = formEntity?.code
        fromAttribute.status = formEntity?.status
        fromAttribute.displayTo = formEntity?.displayTo
        fromAttribute.dependsWhen = formEntity?.dependsOn
        fromAttribute.validation = formEntity?.validation
        fromAttribute.regEx = formEntity?.regEx
        fromAttribute.dataTypeDescription = formEntity?.dataTypeDescription
        fromAttribute.group = formEntity?.group
        fromAttribute.agentOnlyFormAttibute = formEntity?.agentOnlyFormAttibute
        fromAttribute.isDeleted = formEntity?.isDeleted
        fromAttribute.isCalculated = formEntity?.isCalculated
        fromAttribute.isReadOnly = formEntity?.isReadOnly
        fromAttribute.isSystemForm = formEntity?.isSystemForm
        fromAttribute.isRequired = formEntity?.isRequired
        fromAttribute.isDefault = formEntity?.isDefault
        fromAttribute.isVariable = formEntity?.isVariable
        fromAttribute.isDefaultEditableExceptOrder = formEntity?.isDefaultEditableExceptOrder
        fromAttribute.isCaseClasification = formEntity?.isCaseClasification
        fromAttribute.canCutomerEdit = formEntity?.canCutomerEdit
        fromAttribute.canCaseWorkerEdit = formEntity?.canCaseWorkerEdit
        fromAttribute.feildOrder = formEntity?.feildOrder
        fromAttribute.pages = formEntity?.pages
        fromAttribute.formId = formEntity?.formId

        fromAttribute.createdAt = formEntity.createdAt
        fromAttribute.createdBy = formEntity.createdBy
        fromAttribute.deletedAt = formEntity.deletedAt
        fromAttribute.deletedBy = formEntity.deletedBy
        fromAttribute.updatedAt = formEntity.updatedAt
        fromAttribute.updatedBy = formEntity.updatedBy

        return fromAttribute;
    }

    private toFormAttributeEntity(fromAttribute: FormAttribute): FormAttributeEntity {
        const formAttributeEntity: FormAttributeEntity = new FormAttributeEntity()

        formAttributeEntity.id = fromAttribute.id
        formAttributeEntity.name = fromAttribute?.name
        formAttributeEntity.dependsOn = fromAttribute?.dependsOn
        formAttributeEntity.description = fromAttribute?.description
        formAttributeEntity.code = fromAttribute?.code
        formAttributeEntity.status = fromAttribute?.status
        formAttributeEntity.displayTo = fromAttribute?.displayTo
        formAttributeEntity.dependsWhen = fromAttribute?.dependsOn
        formAttributeEntity.validation = fromAttribute?.validation
        formAttributeEntity.regEx = fromAttribute?.regEx
        formAttributeEntity.dataTypeDescription = fromAttribute?.dataTypeDescription
        formAttributeEntity.group = fromAttribute?.group
        formAttributeEntity.agentOnlyFormAttibute = fromAttribute?.agentOnlyFormAttibute
        formAttributeEntity.isDeleted = fromAttribute?.isDeleted
        formAttributeEntity.isCalculated = fromAttribute?.isCalculated
        formAttributeEntity.isReadOnly = fromAttribute?.isReadOnly
        formAttributeEntity.isSystemForm = fromAttribute?.isSystemForm
        formAttributeEntity.isRequired = fromAttribute?.isRequired
        formAttributeEntity.isDefault = fromAttribute?.isDefault
        formAttributeEntity.isVariable = fromAttribute?.isVariable
        formAttributeEntity.isDefaultEditableExceptOrder = fromAttribute?.isDefaultEditableExceptOrder
        formAttributeEntity.isCaseClasification = fromAttribute?.isCaseClasification
        formAttributeEntity.canCutomerEdit = fromAttribute?.canCutomerEdit
        formAttributeEntity.canCaseWorkerEdit = fromAttribute?.canCaseWorkerEdit
        formAttributeEntity.feildOrder = fromAttribute?.feildOrder
        formAttributeEntity.pages = fromAttribute?.pages
        formAttributeEntity.formId = fromAttribute?.formId

        formAttributeEntity.createdAt = fromAttribute.createdAt
        formAttributeEntity.createdBy = fromAttribute.createdBy
        formAttributeEntity.deletedAt = fromAttribute.deletedAt
        formAttributeEntity.deletedBy = fromAttribute.deletedBy
        formAttributeEntity.updatedAt = fromAttribute.updatedAt
        formAttributeEntity.updatedBy = fromAttribute.updatedBy
        return formAttributeEntity
    }

}