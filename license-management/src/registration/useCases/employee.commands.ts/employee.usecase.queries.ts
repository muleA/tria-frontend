/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeEntity } from "src/registration/persistence/Employee/employee.entity";
import { EmployeeRoleEntity } from "src/registration/persistence/Employee/employee-role.entity";
import { EmployeeResponse } from "./employee.responses";
import { EmployeeRoleResponse } from "./employeeRole.response";
import { RoleEntity } from "src/registration/persistence/roles/role.entity";
import { AccountEntity } from "src/registration/persistence/accounts.entity";
@Injectable()
export class EmployeeQueries {
    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(EmployeeRoleEntity)
        private employeeRoleRepository: Repository<EmployeeRoleEntity>,
        @InjectRepository(RoleEntity)
        private RoleEntityRepository: Repository<RoleEntity>,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>
    ) {
    }

    async fecthEmployees(): Promise<EmployeeResponse[]> {
        const result = await this.employeeRepository.find();
        if (!result) {
            throw new NotFoundException(`There is no User !!`);
        }
        return result.map((element) => EmployeeResponse.fromEntity(element))
    }
    async getEmployeeById(id: string): Promise<EmployeeResponse> {
        const result = await this.employeeRepository.findOneBy({ id: id })
        if (!result) {
            throw new NotFoundException(`User with Id ${id} is not found`);
        }
        return EmployeeResponse.fromEntity(result)
    }  
    async getArchivedEmployeeById(id:string): Promise<EmployeeResponse> {    
        const queryBuilder = this.employeeRepository.createQueryBuilder('employee')
        queryBuilder.where('employee.id=:id',{id}).withDeleted().andWhere('employee.deletedAt IS NOT NULL')
        const result = await queryBuilder.getOne()     
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return  EmployeeResponse.fromEntity(result)
    }
    async  getArchivedEmployees(): Promise<EmployeeResponse[]> {
        const queryBuilder = this.employeeRepository.createQueryBuilder('employee')
        queryBuilder.withDeleted().where('employee.deletedAt is not null')
        const result = await queryBuilder.getMany()
        if (!result) {  
            throw new NotFoundException(`Archived Employees  not found`);
        }
        return result.map((element) => EmployeeResponse.fromEntity(element))
    }
    /**
     * 
     * quries related to education 
     */

    async getArchivedRolesByEmployeeId(employeeId:string): Promise<EmployeeRoleResponse> {
        const queryBuilder = this.employeeRoleRepository.createQueryBuilder('employee')
        queryBuilder.where('employee_role.employee_id=:userId',{employeeId}).withDeleted().andWhere('employee_role.deletedAt IS NOT NULL')
        const result = await queryBuilder.getMany()
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return  EmployeeRoleResponse.fromEntity(result[0])
    }
    async getEmployeeRoles(employeeId): Promise<EmployeeRoleResponse[]> {
        const result = await this.employeeRepository.find({where:{id:employeeId},relations:['employeeRole']})
        if (!result) {
            throw new NotFoundException(`Employee  not found`);
        }
        return EmployeeResponse.fromEntity(result[0]).employeeRole
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
    async getEmployeeByEmail(email:string): Promise<any> {
        const result =await this.employeeRepository.findOne({where:{email:email},relations:['employeeRole']})
         return result
    }
    async getAccountById(id:string): Promise<any> {
        return await this.accountRepository.findOne({where:{id}})
    }
    async getAccountByEmail(email:string): Promise<any> {
        return await this.accountRepository.findOne({where:{email}})
    }
}