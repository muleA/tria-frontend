/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { EmployeeEntity } from "./employee.entity";
import { EmployeeRoleEntity } from "./employee-role.entity";
import { IEmployeeRepository } from "src/registration/domain/employee/employee.repository.interface";
import { EmployeeRole } from "src/registration/domain/employee/employee-role";
import { Employee } from "src/registration/domain/employee/employee";

export class EmployeeRepository implements IEmployeeRepository {
    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(EmployeeRoleEntity)
        private employeeRoleRepository: Repository<EmployeeRoleEntity>,
    ) {
        //  super()
    }
    async insertEmployee(employee: Employee): Promise<Employee> {
        const employeeEntity = this.toEmployeeEntity(employee)
        console.log('employee Entity : ',employeeEntity)
        const result = await this.employeeRepository.save(employeeEntity)
        return result ? this.toEmployee(result) : null;
    }
    async updateEmployee(employee: Employee): Promise<Employee> {
        const employeeEntity=this.toEmployeeEntity(employee)
        const result=await this.employeeRepository.save(employeeEntity)
        return result? this.toEmployee(result):null;
    }
    async findAll(): Promise<Employee[]> {
        const result = await this.employeeRepository.find()
        return result ? result.map((element) => this.toEmployee(element)) : null
    }
    async findById(id: string): Promise<Employee> {
        try {
            const result=await this.employeeRepository.find({ where:{id: id},relations:['employeeRole'] })
            console.log('employee entity ',result)
            return this.toEmployee(result[0])
        } catch (error) {
            Logger.log(` Employee with Id ${id} is not found`)
        }

    }
    async deleteById(id: string): Promise<boolean> {
        const result = await this.employeeRepository.delete(id)
        if (result.affected > 0) return true;
        return false;
    }
    async softDeleteEmployee(userID: string): Promise<boolean> {
        const result= await this.employeeRepository.softDelete(userID)
        if (result.affected > 0) return true;
        return false;
    }
   async  restoreEmployee(userID: string): Promise<boolean> {
        const result=await this.employeeRepository.restore(userID)
        if (result.affected > 0) return true;
        return false;
    }
    // Transforming 
    private toEmployeeEntity(employee: Employee):EmployeeEntity{
        const employeeEntity: EmployeeEntity = new EmployeeEntity()
        employeeEntity.id = employee?.id
        employeeEntity.accountId = employee?.accountId
        employeeEntity.firstName = employee.firstName
        employeeEntity.middleName = employee.middleName
        employeeEntity.lastName = employee.lastName
        employeeEntity.gender = employee.gender
        employeeEntity.email = employee.email
        employeeEntity.status = employee.status
        employeeEntity.phone = employee.phone
        employeeEntity.subCity = employee.subCity
        employeeEntity.wereda = employee.wereda
        employeeEntity.kebele = employee.kebele
        employeeEntity.city = employee.city
        employeeEntity.houseNumber = employee.houseNumber
        employeeEntity.createdAt = employee.createdAt
        employeeEntity.createdBy = employee.createdBy
        employeeEntity.deletedAt = employee.deletedAt
        employeeEntity.deletedBy = employee.deletedBy
        employeeEntity.updatedAt = employee.updatedAt
        employeeEntity.updatedBy = employee.updatedBy
        employeeEntity.employeeRole = employee?.employeeRole?.map((element) =>
        this.toEmployeeRoleEntity(element)
          )
        return employeeEntity;
    }
    private toEmployee(employeeEntity: EmployeeEntity): Employee{
        const employee: Employee = new Employee()
        employee.id = employeeEntity.id
        employee.accountId = employeeEntity.accountId
        employee.firstName = employeeEntity.firstName
        employee.middleName = employeeEntity.middleName
        employee.lastName = employeeEntity.lastName
        employee.gender = employeeEntity.gender
        employee.email = employeeEntity.email
        employee.status = employeeEntity.status
        employee.phone = employeeEntity.phone
        employee.subCity = employeeEntity.subCity
        employee.wereda = employeeEntity.wereda
        employee.kebele = employeeEntity.kebele
        employee.city = employeeEntity.city
        employee.houseNumber = employeeEntity.houseNumber
        employee.createdAt = employeeEntity.createdAt
        employee.createdBy = employeeEntity.createdBy
        employee.deletedAt = employeeEntity.deletedAt
        employee.deletedBy = employeeEntity.deletedBy
        employee.updatedAt = employeeEntity.updatedAt
        employee.updatedBy = employeeEntity.updatedBy
        employee.employeeRole = employeeEntity.employeeRole?.map((element) =>
            this.toEmployeeRole(element)
        )
       
        return employee;
    }
    private toEmployeeRole(employeeRoleEntity: EmployeeRoleEntity): EmployeeRole {
        const employeeRole: EmployeeRole = new EmployeeRole()

        employeeRole.id = employeeRoleEntity.id
        employeeRole.isActive = employeeRoleEntity.isActive
        employeeRole.roleName = employeeRoleEntity.roleName
        employeeRole.employeeId = employeeRoleEntity.employeeId
        employeeRole.roleId = employeeRoleEntity.roleId
        
        employeeRole.createdAt = employeeRoleEntity.createdAt
        employeeRole.createdBy = employeeRoleEntity.createdBy
        employeeRole.deletedAt = employeeRoleEntity.deletedAt
        employeeRole.deletedBy = employeeRoleEntity.deletedBy
        employeeRole.updatedAt = employeeRoleEntity.updatedAt
        employeeRole.updatedBy = employeeRoleEntity.updatedBy
        return employeeRole
    }
    private toEmployeeRoleEntity(employeeRole: EmployeeRole): EmployeeRoleEntity {
        const employeeRoleEntity: EmployeeRoleEntity = new EmployeeRoleEntity()

        employeeRoleEntity.id = employeeRole.id
        employeeRoleEntity.isActive = employeeRole.isActive
        employeeRoleEntity.roleName = employeeRole.roleName
        employeeRoleEntity.employeeId = employeeRole.employeeId
        employeeRoleEntity.roleId = employeeRole.roleId
        
        employeeRoleEntity.createdAt = employeeRole.createdAt
        employeeRoleEntity.createdBy = employeeRole.createdBy
        employeeRoleEntity.deletedAt = employeeRole.deletedAt
        employeeRoleEntity.deletedBy = employeeRole.deletedBy
        employeeRoleEntity.updatedAt = employeeRole.updatedAt
        employeeRoleEntity.updatedBy = employeeRole.updatedBy
        return employeeRoleEntity
    }
    
}