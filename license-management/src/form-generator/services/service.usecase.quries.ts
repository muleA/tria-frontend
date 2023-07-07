import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Form } from '../domain/form';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { FormEntity } from '../persistance/form.entity';
import { FormRepository } from '../persistance/form.repository';
import { CreateFormCommand, UpdateFormCommand } from '../usecases/form.commands';
import { FormResponse } from '../usecases/form.response';
import { FormAttributeEntity } from '../persistance/attribute.entity';
import { FormAttributeResponse } from '../usecases/formAttribute.response';

@Injectable()
export class ServicesServiceQuries {
    // private formDomain: Form = new Form()
    private logger = new Logger("FormGeneratorService")
    constructor(
        // private formRepository: FormRepository,
        @InjectRepository(FormEntity)
        private formRepository: Repository<FormEntity>,
        @InjectRepository(FormAttributeEntity)
        private formAttributesRepository: Repository<FormAttributeEntity>,

    ) { }

    async fecthForms(): Promise<FormResponse[]> {
        const result = await this.formRepository.find();
        if (!result) {
            throw new NotFoundException(`There is no Froms !!`);
        }
        return result.map((element) => FormResponse.fromEntity(element))
    }
    async getFormById(id: string): Promise<FormResponse> {
        const result = await this.formRepository.findOneBy({ id: id })
        if (!result) {
            throw new NotFoundException(`Form with Id ${id} is not found`);
        }
        return FormResponse.fromEntity(result)
    }  
    async getArchivedFormById(id:string): Promise<FormResponse> {    
        const queryBuilder = this.formRepository.createQueryBuilder('form')
        queryBuilder.where('form.id=:id',{id}).withDeleted().andWhere('form.deletedAt IS NOT NULL')
        const result = await queryBuilder.getOne()     
        if (!result) {
            throw new NotFoundException(`Archived Form  not found`);
        }
        return  FormResponse.fromEntity(result)
    }
    async  getArchivedForms(): Promise<FormResponse[]> {
        const queryBuilder = this.formRepository.createQueryBuilder('form')
        queryBuilder.withDeleted().where('form.deletedAt is not null')
        const result = await queryBuilder.getMany()
        if (!result) {  
            throw new NotFoundException(`Archived Forms  not found`);
        }
        return result.map((element) => FormResponse.fromEntity(element))
    }
    /**
     * 
     * quries related to education 
     */
    async getFormAttributesByFormId(formId:string): Promise<FormAttributeResponse[]> {
        const result = await this.formRepository.find({where:{id:formId},relations:['formAttributes']})
        if (!result) {
            throw new NotFoundException(`Archived Forms  not found`);
        }
        return result[0].formAttributes.map((element)=>FormAttributeResponse.fromEntity(element))
    }
    async getArchivedFormAttributesByFormId(formId:string): Promise<FormAttributeResponse[]> {
        const queryBuilder = this.formAttributesRepository.createQueryBuilder('form_attribute')
        queryBuilder.where('form_attribute.formId=:formId',{formId}).withDeleted().andWhere('form_attribute.deletedAt IS NOT NULL')
        const [result,total] = await queryBuilder.getManyAndCount()     
        if (!result) {
            throw new NotFoundException(`Archived Form attribute if not found not found`);
        }
        return  result.map((element)=>FormAttributeResponse.fromEntity(element))
    }
    async getFormAttributes(): Promise<FormAttributeResponse[]> {
        const result = await this.formAttributesRepository.find()
        if (!result) {
            throw new NotFoundException(`Forms  not found`);
        }
        return result.map((element)=>FormAttributeResponse.fromEntity(element))
    }
                                                                              
    //get Roles
    // async getEducationFileByUserId(userId:string,educationId:string): Promise<string> {
    //     const result= await this.userRepository.find({where:{id:userId},relations:['education']})
    //     const education=result[0].education.find((element)=>{return element.id==educationId})

    //     return education.file
        
    // }
    // async getExperienceFileByUserId(userId:string,expirianceId:string): Promise<string> {
    //     const result= await this.userRepository.find({where:{id:userId},relations:['expiriance']})
    //     const expiriance=result[0].expiriance.find((element)=>{return element.id==expirianceId})
    //     return expiriance.file
        
    // }
    // async getUsergetCertificateFileByUserIdByEmail(userId:string,certificateId:string): Promise<string> {
    //     const result= await this.userRepository.find({where:{id:userId},relations:['certificate']})
    //     const expiriance=result[0].certificate.find((element)=>{return element.id==certificateId})
    //     return expiriance.file;
    // }

    // for Authentication 
   
}
