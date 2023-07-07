import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Form } from '../domain/form';
import { InjectRepository } from '@nestjs/typeorm';
import { FormEntity } from '../persistance/form.entity';
import { FormRepository } from '../persistance/form.repository';
import { AddAttributeToFormCommand, CreateFormCommand, UpdateFormCommand } from '../usecases/form.commands';
import { FormResponse } from '../usecases/form.response';
import { CreateFormAttributeCommand, UpdateFormAttributeCommand } from '../usecases/formAttribute.command';

@Injectable()
export class ServicesServiceCommands {
    private formDomain: Form = new Form()
    private logger = new Logger("FormGeneratorService")
    constructor(
        private formRepository: FormRepository,
        // @InjectRepository(FormEntity)
        // private employeeRoleRepository: Repository<EmployeeRoleEntity>,

    ) { }
    async createForm(command: CreateFormCommand): Promise<FormResponse> {
        try {
            const formEntity = CreateFormCommand.fromCommands(command)
            this.formDomain = await this.formRepository.insertForm(formEntity)
            if (!this.formDomain) {
                throw new NotFoundException(`Failed to create Form`);
            }
            return FormResponse.fromDomain(this.formDomain)
        } catch (error) {
            Logger.log('Unable to create the Form because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveForm(formId: string): Promise<boolean> {
        try {
            this.formDomain = await this.formRepository.findById(formId)
            if (!this.formDomain) {
                throw new NotFoundException(`Form with Id ${formId} is not found `);
            }
            const result = this.formRepository.softDeleteForm(this.formDomain.id)
            this.logger.log(
                "Archive Form command executed ",
                `form  ${this.formDomain.id} have been Archived`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Archive the form because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveForm(formId: string): Promise<boolean> {
        try {
            const result = await this.formRepository.restoreForm(
                formId
            );
            this.logger.log(
                "Restore employee execute",
                `employee ${formId} have been restored`
            );
            return result;
        } catch (error) {
            this.logger.log(`unable to retore employee ${formId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateForm(updateEmployeeCommand: UpdateFormCommand): Promise<FormResponse> {
        try {
            this.formDomain = await this.formRepository.findById(updateEmployeeCommand.id)
            if (!this.formDomain) {
                throw new NotFoundException(`fORM with Id ${updateEmployeeCommand.id} is not found `);
            }
            this.formDomain = UpdateFormCommand.fromCommands(updateEmployeeCommand);
            const result = await this.formRepository.updateForm(this.formDomain)
            this.logger.log(
                "update FORM command executed ",
                `form  ${this.formDomain.id} have been Deleted`
            );
            return FormResponse.fromDomain(result)
        } catch (error) {
            Logger.log('Unable to Delete the form because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteForm(formId: string): Promise<boolean> {
        try {
            this.formDomain = await this.formRepository.findById(formId)

            if (!this.formDomain) {
                throw new NotFoundException(`Form with Id ${formId} is not found `);
            }
            // if(this.formDomain.employeeRole.length!==0) throw new ForbiddenException(`Employee with Id ${formId} is not found `);
            const result = this.formRepository.deleteById(this.formDomain.id)
            this.logger.log(
                "Delete Form command executed ",
                `Form  ${this.formDomain.id} have been Deleted`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Delete the Form because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async addFormAttributeToForm(command: CreateFormAttributeCommand[], formId: string): Promise<any> {
        try {
            this.formDomain = await this.formRepository.findById(formId)
            console.log(this.formDomain)
            if (!this.formDomain) {
                throw new NotFoundException(`Form with Id ${formId} does not exist`);
            }
            // this.formDomain.formAttributes = []
            for (let index = 0; index < command.length; index++) {
                command[index].formId=formId
                const createFormAttributeCommand = CreateFormAttributeCommand.fromCommands(command[index])
                this.formDomain.formAttributes.push(createFormAttributeCommand)
            }
            console.log('after pushing employeeRole ', this.formDomain)
            this.formDomain = await this.formRepository.updateForm(this.formDomain)
            return FormResponse.fromDomain(this.formDomain).formAttributes
        } catch (error) {
            Logger.log('Unable to add the attribute  because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateFormAttributeFromForm(command: UpdateFormAttributeCommand): Promise<any> {
        try {
            this.formDomain = await this.formRepository.findById(command.formId)
            console.log(this.formDomain)
            if (!this.formDomain) {
                throw new NotFoundException(`Form with Id ${command.formId} does not exist`);
            }
            // this.formDomain.formAttributes = []
            const formAttributeDomain=UpdateFormAttributeCommand.fromCommands(command)
            this.formDomain.updateFormAttribute(formAttributeDomain)
            console.log('going to update', this.formDomain)
            this.formDomain = await this.formRepository.updateForm(this.formDomain)
            console.log('done updating', this.formDomain)
            return FormResponse.fromDomain(this.formDomain).formAttributes
        } catch (error) {
            Logger.log('Unable to update the attribute  because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteFormAttributeFromForm(formAttributeId: string,aggregateId:string): Promise<any> {
        try {
            this.formDomain = await this.formRepository.findById(aggregateId)
            console.log(this.formDomain)
            if (!this.formDomain) {
                throw new NotFoundException(`Form with Id ${aggregateId} does not exist`);
            }
            // this.formDomain.formAttributes = []
            // const formAttributeDomain=UpdateFormAttributeCommand.fromCommands(command)
            this.formDomain.removeFormAttribute(formAttributeId)
            console.log('going to update', this.formDomain)
            this.formDomain = await this.formRepository.updateForm(this.formDomain)
            console.log('done updating', this.formDomain)
            return FormResponse.fromDomain(this.formDomain).formAttributes
        } catch (error) {
            Logger.log('Unable to remove the attribute  because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    // async softDeleteFormAttribute(formAttributeId: string,aggregateId:string): Promise<any> {
    //     try {
    //         this.formDomain = await this.formRepository.findById(aggregateId)
    //         console.log(this.formDomain)
    //         if (!this.formDomain) {
    //             throw new NotFoundException(`Form with Id ${aggregateId} does not exist`);
    //         }
    //         // this.formDomain.formAttributes = []
    //         // const formAttributeDomain=UpdateFormAttributeCommand.fromCommands(command)
    //         this.formDomain.removeFormAttribute(formAttributeId)
    //         console.log('going to update', this.formDomain)
    //         this.formDomain = await this.formRepository.updateForm(this.formDomain)
    //         console.log('done updating', this.formDomain)
    //         return FormResponse.fromDomain(this.formDomain).formAttributes
    //     } catch (error) {
    //         Logger.log('Unable to remove the attribute  because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async deleteFormAttributeFromForm(formAttributeId: string,aggregateId:string): Promise<any> {
    //     try {
    //         this.formDomain = await this.formRepository.findById(aggregateId)
    //         console.log(this.formDomain)
    //         if (!this.formDomain) {
    //             throw new NotFoundException(`Form with Id ${aggregateId} does not exist`);
    //         }
    //         // this.formDomain.formAttributes = []
    //         // const formAttributeDomain=UpdateFormAttributeCommand.fromCommands(command)
    //         this.formDomain.removeFormAttribute(formAttributeId)
    //         console.log('going to update', this.formDomain)
    //         this.formDomain = await this.formRepository.updateForm(this.formDomain)
    //         console.log('done updating', this.formDomain)
    //         return FormResponse.fromDomain(this.formDomain).formAttributes
    //     } catch (error) {
    //         Logger.log('Unable to remove the attribute  because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
}
