/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import * as bcrypt from 'bcrypt'

import {
    BadRequestException,
    NotFoundException,
    Inject,
    Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/registration/domain/employee/employee";
import { EmployeeRepository } from "src/registration/persistence/Employee/employee.repository";
import { EmployeeRoleEntity } from "src/registration/persistence/Employee/employee-role.entity";
import { CreateEmployeeCommand, UpdateEmployeeCommand } from "./employee.command";
import { EmployeeResponse } from "./employee.responses";
import { UpdateUserCommand } from "../user.command";
import { AddRoleToEmployeeCommand, CreateEmployeeRoleCommand } from "./employeeRole.command";
import { EmployeeRoleResponse } from "./employeeRole.response";
import { AssignEmployeeToRoleCommand } from "./role.commands";

@Injectable()
export class EmployeeCommand {
    private employeeDomain: Employee = new Employee()
    private logger = new Logger("EmployeeService")
    constructor(
        private employeeRepository: EmployeeRepository,
        @InjectRepository(EmployeeRoleEntity)
        private employeeRoleRepository: Repository<EmployeeRoleEntity>,

    ) { }

    async createEmployee(command: CreateEmployeeCommand): Promise<EmployeeResponse> {
        try {
            const employeeEntity = CreateEmployeeCommand.fromCommands(command)
            this.employeeDomain = await this.employeeRepository.insertEmployee(employeeEntity)
            if (!this.employeeDomain) {

                throw new NotFoundException(`Failed to create Employee`);
            }
            return EmployeeResponse.fromDomain(this.employeeDomain)
        } catch (error) {
            Logger.log('Unable to create the employee because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveEmployee(employeeId: string): Promise<boolean> {
        try {
            this.employeeDomain = await this.employeeRepository.findById(employeeId)
            if (!this.employeeDomain) {
                throw new NotFoundException(`Employee with Id ${employeeId} is not found `);
            }
            const result = this.employeeRepository.softDeleteEmployee(this.employeeDomain.id)
            this.logger.log(
                "Archive Employee command executed ",
                `employee  ${this.employeeDomain.id} have been Archived`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Archive the employee because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveEmployee(employeeId: string): Promise<boolean> {
        try {
            const result = await this.employeeRepository.restoreEmployee(
                employeeId
            );
            this.logger.log(
                "Restore employee execute",
                `employee ${employeeId} have been restored`
            );
            return result;
        } catch (error) {
            this.logger.log(`unable to retore employee ${employeeId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateEmployee(updateEmployeeCommand: UpdateEmployeeCommand): Promise<EmployeeResponse> {
        try {
            this.employeeDomain = await this.employeeRepository.findById(updateEmployeeCommand.id)
            if (!this.employeeDomain) {
                throw new NotFoundException(`Employee with Id ${updateEmployeeCommand.id} is not found `);
            }
            this.employeeDomain = UpdateEmployeeCommand.fromCommands(updateEmployeeCommand);
            const result = await this.employeeRepository.updateEmployee(this.employeeDomain)
            this.logger.log(
                "update employee command executed ",
                `employee  ${this.employeeDomain.id} have been Deleted`
            );
            return EmployeeResponse.fromDomain(result)
        } catch (error) {
            Logger.log('Unable to Delete the employee because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteEmployee(employeeId: string): Promise<boolean> {
        try {
            this.employeeDomain = await this.employeeRepository.findById(employeeId)

            if (!this.employeeDomain) {
                throw new NotFoundException(`Employee with Id ${employeeId} is not found `);
            }
            // if(this.employeeDomain.employeeRole.length!==0) throw new ForbiddenException(`Employee with Id ${employeeId} is not found `);
            const result = this.employeeRepository.deleteById(this.employeeDomain.id)
            this.logger.log(
                "Delete Employee command executed ",
                `employee  ${this.employeeDomain.id} have been Deleted`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Delete the employee because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }

    //   this  is  service commands for EmployeeRole

    async addRoleToEmployeeCommand(command: AddRoleToEmployeeCommand[], employeeId: string): Promise<any> {
        try {
            this.employeeDomain = await this.employeeRepository.findById(employeeId)
            console.log(command)
            if (!this.employeeDomain) {
                throw new NotFoundException(`Employee with Id ${employeeId} does not exist`);
            }
            this.employeeDomain.employeeRole = []
            for (let index = 0; index < command.length; index++) {
                const createEmployeeRoleCommand = new CreateEmployeeRoleCommand()
                createEmployeeRoleCommand.employeeId = employeeId
                createEmployeeRoleCommand.roleName = command[index].roleName
                createEmployeeRoleCommand.roleId = command[index].roleId;
                // createEmployeeRoleCommand.id = command[index].id;
                createEmployeeRoleCommand.createdAt = command[index].createdAt;
                createEmployeeRoleCommand.isActive = true;
                const employeeRoleCommand = CreateEmployeeRoleCommand.fromCommands(createEmployeeRoleCommand)
                this.employeeDomain.employeeRole.push(employeeRoleCommand)

            }
            console.log('after pushing employeeRole ', this.employeeDomain)
            this.employeeDomain = await this.employeeRepository.insertEmployee(this.employeeDomain)
            // command.roleId.forEach((role) => {
            //     const createEmployeeRoleCommand = new CreateEmployeeRoleCommand()
            //     createEmployeeRoleCommand.employeeId = employeeId
            //     createEmployeeRoleCommand.roleId = role;
            //     createEmployeeRoleCommand.id = command.id;
            //     createEmployeeRoleCommand.createdAt = command.createdAt;
            //     createEmployeeRoleCommand.isActive = true;
            //     const employeeRoleCommand = CreateEmployeeRoleCommand.fromCommands(createEmployeeRoleCommand)
            //     this.employeeDomain.employeeRole.push(employeeRoleCommand)
            //     console.log('after pushing employeeRole ',this.employeeDomain)

            //     this.employeeDomain = await this.employeeRepository.insertEmployee(this.employeeDomain)
            // })


            return EmployeeResponse.fromDomain(this.employeeDomain).employeeRole
        } catch (error) {
            Logger.log('Unable to create the Education because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async assignRoleToEmployee(employeedId: string, assignEmployeeToRoleCommand: AssignEmployeeToRoleCommand): Promise<boolean> {
        try {
            this.employeeDomain = await this.employeeRepository.findById(employeedId)
            if (!this.employeeDomain) {
                throw new NotFoundException(`Role with Id ${employeedId} is not found `);
            }

            const result = this.employeeRepository.deleteById(this.employeeDomain.id)
            this.logger.log(
                "Delete role command executed ",
                `role  ${this.employeeDomain.id} have been Deleted`
            );
            return result
        } catch (error) {
            Logger.log(`Unable to assign  the roles  to employee with Id ${employeedId}`, error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    // async archiveEducation(educationId: string): Promise<boolean> {
    //     try {
    //         const educationDomain = await this.educationRepository.findOneBy({ id: educationId })
    //         if (!educationDomain) {
    //             throw new NotFoundException(`Education with Id ${educationId} is not found `);
    //         }
    //         const result = await this.educationRepository.softDelete(educationId)
    //         this.logger.log(
    //             "Archive Education command executed ",
    //             `Education  ${this.employeeDomain.id} have been Archived`
    //         );
    //         if (result.affected > 0) return true;
    //         return false;
    //     } catch (error) {
    //         Logger.log('Unable to Archive the education because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async unArchiveEducation(educationId: string): Promise<boolean> {
    //     try {
    //         const result = await this.educationRepository.restore(educationId);
    //         this.logger.log(
    //             "Restore Education execute",
    //             `education ${educationId} have been restored`
    //         );
    //         if (result.affected > 0) return true;
    //         return false;
    //     } catch (error) {
    //         this.logger.log(`unable to retore education ${educationId}`)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async updateEducation(updateEducationCommand: UpdateEducationCommand): Promise<EducationResponse[]> {
    //     try {
    //         this.employeeDomain = await this.employeeRepository.findById(updateEducationCommand.userId)
    //         if (!this.employeeDomain) {
    //             throw new NotFoundException(`User with Id ${updateEducationCommand.id} is not found `);
    //         }
    //         await this.employeeDomain.updateEducation(UpdateEducationCommand.fromCommands(updateEducationCommand))
    //         const result = await this.employeeRepository.updateUser(this.employeeDomain)
    //         this.logger.log(
    //             "Delete Education command executed ",
    //             `Education  ${this.employeeDomain.id} have been Deleted`
    //         );
    //         return UserResponse.fromDomain(result).education
    //     } catch (error) {
    //         Logger.log('Unable to update the Education because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async deleteEducation(educationId: string): Promise<boolean> {
    //     try {
    //         const data = await this.educationRepository.findOneBy({ id: educationId })
    //         if (!data) {
    //             throw new NotFoundException(`Education with Id ${educationId} is not found `);
    //         }
    //         const result = await this.educationRepository.delete(data.id)
    //         this.logger.log(
    //             "Delete User command executed ",
    //             `user  ${this.employeeDomain.id} have been Deleted`
    //         );
    //         if (result.affected > 0) return true;
    //         return false;
    //     } catch (error) {
    //         Logger.log('Unable to Delete the user because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }


    //   this  is  service commands for Role

    // async createAccount(command: CreateAccountCommand): Promise<any> {
    //     try {
    //         // this.employeeDomain = await this.userRepository.findById(command.userID)
    //         // if (!this.employeeDomain) {
    //         //     throw new NotFoundException(`Failed to create Account`);
    //         // }
    //         // this is for hashing the password
    //         // const salt = await bcrypt.genSalt()
    //         const salt = '$2a$12$2vzqgDZ6W0J2cE8BdJi5Fe'
    //         const password = await bcrypt.hash(command.Password, salt);
    //         command.Password = password
    //         const account = CreateAccountCommand.fromCommands(command)
    //         console.log(account)
    //         const result = await this.accountRepository.insert(account)
    //         console.log(result)
    //         return true;
    //         // return AccountResponse.fromEntity(result)
    //     } catch (error) {
    //         Logger.log('Unable to create the Account because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async archiveAccount(accountId: string): Promise<boolean> {
    //     try {
    //         const result = await this.accountRepository.softDelete(accountId)
    //         this.logger.log(
    //             "Archive Account command executed ",
    //             `Account  ${accountId} have been Archived`
    //         );
    //         if (result.affected > 0) return true;
    //         return false;
    //     } catch (error) {
    //         Logger.log('Unable to Archive the Account because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async unArchiveAccount(accountId: string): Promise<boolean> {
    //     try {
    //         const result = await this.accountRepository.restore(accountId);
    //         this.logger.log(
    //             "Restore Account execute",
    //             `Account ${accountId} have been restored`
    //         );
    //         if (result.affected > 0) return true;
    //         return false;
    //     } catch (error) {
    //         this.logger.log(`unable to retore certificate ${accountId}`)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async updateAccount(updateAccountCommand: UpdateAccountCommand): Promise<AccountResponse> {
    //     try {
    //         this.employeeDomain = await this.userRepository.findById(updateAccountCommand.userId)
    //         if (!this.employeeDomain) {
    //             throw new NotFoundException(`Certificate with Id ${updateAccountCommand.id} is not found `);
    //         }
    //         this.employeeDomain.account = UpdateAccountCommand.fromCommands(updateAccountCommand);
    //         const result = await this.userRepository.updateUser(this.employeeDomain)
    //         this.logger.log(
    //             "Update Certificate command executed ",
    //             `Certificate  ${this.employeeDomain.id} have been Deleted`
    //         );
    //         return UserResponse.fromDomain(result).account
    //     } catch (error) {
    //         Logger.log('Unable to update the Experience because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async deleteAccount(accountId: string): Promise<boolean> {
    //     try {
    //         const result = await this.accountRepository.delete(accountId)
    //         this.logger.log(
    //             "Delete Account command executed ",
    //             `Account  ${this.employeeDomain.id} have been Deleted`
    //         );
    //         if (result.affected > 0) return true;
    //         return false;
    //     } catch (error) {
    //         Logger.log('Unable to Delete the Account because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async uploadEducationFile(path: string,userId:string,educationId:string): Promise<EducationResponse[]> {
    //     try {

    //         this.employeeDomain = await this.userRepository.findById(userId)
    //         if(!this.employeeDomain){
    //             throw new NotFoundException(`user with Id ${userId} not found`);
    //         }
    //         this.employeeDomain.addEducation(path,educationId)

    //         const result = await this.userRepository.updateUser(this.employeeDomain)
    //         this.logger.log(
    //             "Education add file command executed ",
    //         );
    //         return UserResponse.fromDomain(result).education
    //     } catch (error) {
    //         Logger.log('Unable to Delete the Account because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async uploadExperienceFile(filename: string,userId:string,educationId:string): Promise<ExperienceResponses[]> {
    //     try {

    //         this.employeeDomain = await this.userRepository.findById(userId)
    //         if(!this.employeeDomain){
    //             throw new NotFoundException(`user with Id ${userId} not found`);
    //         }

    //         this.employeeDomain.addExpiriance(filename,educationId)
    //         const result = await this.userRepository.updateUser(this.employeeDomain)
    //         this.logger.log(
    //             "Education add file command executed ",
    //         );
    //         return UserResponse.fromDomain(result).expiriance
    //     } catch (error) {
    //         Logger.log('Unable to Delete the Account because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
    // async uploadCertificateFile(filename: string,userId:string,certificateId:string): Promise<CertificateResponse[]> {
    //     try {

    //         this.employeeDomain = await this.userRepository.findById(userId)
    //         if(!this.employeeDomain){
    //             throw new NotFoundException(`user with Id ${userId} not found`);
    //         }

    //         this.employeeDomain.addCertificate(filename,certificateId)
    //         const result = await this.userRepository.updateUser(this.userDomain)
    //         this.logger.log(
    //             "Certificate add file command executed ",
    //         );
    //         return UserResponse.fromDomain(result).certificate
    //     } catch (error) {
    //         Logger.log('Unable to Upload the Certificate because ', error)
    //         throw new BadRequestException(error.code, error.message);
    //     }
    // }
}