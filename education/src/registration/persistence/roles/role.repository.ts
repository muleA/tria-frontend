/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { IRoleRepository } from "src/registration/domain/employee/role.repository.interface";
import { Role } from "src/registration/domain/employee/role";
import { EmployeeRoleEntity } from "../Employee/employee-role.entity";
import { EmployeeRole } from "src/registration/domain/employee/employee-role";
import { RoleEntity } from "./role.entity";
import { RolePermissionEntity } from "./role-permission.entity";
import { RolePermission } from "src/registration/domain/employee/rolePermission";

export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {
        //  super()
    }
    async insertRole(role: Role): Promise<Role> {
        try {
            const roleEntity = this.toRoleEntity(role)
            const result = await this.roleRepository.save(roleEntity)
            return result ? this.toRole(result) : null;
        } catch (error) {
            Logger.log(error)
        }
    }
    async updateRole(role: Role): Promise<Role> {
        const employeeEntity = this.toRoleEntity(role)
        const result = await this.roleRepository.save(employeeEntity)
        return result ? this.toRole(result) : null;
    }
    async findAll(): Promise<Role[]> {
        const result = await this.roleRepository.find()
        return result ? result.map((element) => this.toRole(element)) : null
    }
    async findById(id: string): Promise<Role> {
        try {
            const result = await this.roleRepository.find({ where: { id: id },relations:["rolePermission"] })
            return this.toRole(result[0])
        } catch (error) {
            Logger.log(` Role with Id ${id} is not found`)
        }

    }
    async deleteById(id: string): Promise<boolean> {
        const result = await this.roleRepository.delete(id)
        if (result.affected > 0) return true;
        return false;
    }
    async softDeleteRole(roleID: string): Promise<boolean> {
        const result = await this.roleRepository.softDelete(roleID)
        if (result.affected > 0) return true;
        return false;
    }
    async restoreRole(roleID: string): Promise<boolean> {
        const result = await this.roleRepository.restore(roleID)
        if (result.affected > 0) return true;
        return false;
    }
    // Transforming 
    // private toEmployeeEntity(employee: Employee):EmployeeEntity{
    //     const employeeEntity: EmployeeEntity = new EmployeeEntity()
    //     employeeEntity.id = employee?.id
    //     employeeEntity.firstName = employee.firstName
    //     employeeEntity.middleName = employee.middleName
    //     employeeEntity.lastName = employee.lastName
    //     employeeEntity.gender = employee.gender
    //     employeeEntity.email = employee.email
    //     employeeEntity.phone = employee.phone
    //     employeeEntity.subCity = employee.subCity
    //     employeeEntity.wereda = employee.wereda
    //     employeeEntity.kebele = employee.kebele
    //     employeeEntity.city = employee.city
    //     employeeEntity.houseNumber = employee.houseNumber
    //     employeeEntity.createdAt = employee.createdAt
    //     employeeEntity.createdBy = employee.createdBy
    //     employeeEntity.deletedAt = employee.deletedAt
    //     employeeEntity.deletedBy = employee.deletedBy
    //     employeeEntity.updatedAt = employee.updatedAt
    //     employeeEntity.updatedBy = employee.updatedBy
    //     employeeEntity.employeeRole = employee?.employeeRole?.map((element) =>
    //     this.toEmployeeRoleEntity(element)
    //       )
    //     return employeeEntity;
    // }
    // private toEmployee(employeeEntity: EmployeeEntity): Employee{
    //     const employee: Employee = new Employee()
    //     employee.id = employeeEntity.id
    //     employee.firstName = employeeEntity.firstName
    //     employee.middleName = employeeEntity.middleName
    //     employee.lastName = employeeEntity.lastName
    //     employee.gender = employeeEntity.gender
    //     employee.email = employeeEntity.email
    //     employee.phone = employeeEntity.phone
    //     employee.subCity = employeeEntity.subCity
    //     employee.wereda = employeeEntity.wereda
    //     employee.kebele = employeeEntity.kebele
    //     employee.city = employeeEntity.city
    //     employee.houseNumber = employeeEntity.houseNumber
    //     employee.createdAt = employeeEntity.createdAt
    //     employee.createdBy = employeeEntity.createdBy
    //     employee.deletedAt = employeeEntity.deletedAt
    //     employee.deletedBy = employeeEntity.deletedBy
    //     employee.updatedAt = employeeEntity.updatedAt
    //     employee.updatedBy = employeeEntity.updatedBy
    //     employee.employeeRole = employeeEntity.employeeRole?.map((element) =>
    //         this.toEmployeeRole(element)
    //     )

    //     return employee;
    // }
    private toEmployeeRole(employeeRoleEntity: EmployeeRoleEntity): EmployeeRole {
        const employeeRole: EmployeeRole = new EmployeeRole()

        employeeRole.id = employeeRoleEntity.id
        employeeRole.isActive = employeeRoleEntity.isActive
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
    private toRole(roleEntity: RoleEntity): Role {
        const role: Role = new Role()

        role.id = roleEntity.id
        role.name = roleEntity.name
        role.key = roleEntity.key
        role.isDefault = roleEntity.isDefault
        role.description = roleEntity.description
        role.employeeRole = roleEntity?.employeeRole?.map((element) => this.toEmployeeRole(element))
        role.rolePermission = roleEntity?.rolePermission?.map((element) => this.toRolePermission(element))

        role.createdAt = roleEntity.createdAt
        role.createdBy = roleEntity.createdBy
        role.deletedAt = roleEntity.deletedAt
        role.deletedBy = roleEntity.deletedBy
        role.updatedAt = roleEntity.updatedAt
        role.updatedBy = roleEntity.updatedBy
        return role
    }
    private toRoleEntity(role: Role): RoleEntity {
        const roleEntity: RoleEntity = new RoleEntity()

        roleEntity.id = role?.id
        roleEntity.name = role.name
        roleEntity.key = role.key
        roleEntity.isDefault = role.isDefault
        roleEntity.description = role.description
        // roleEntity.employeeRole = role?.employeeRole?.map((element) => this.toEmployeeRoleEntity(element))
       roleEntity.rolePermission = role?.rolePermission?.map((element)=>this.toRolePemissionEntity(element))
        roleEntity.createdAt = role.createdAt
        roleEntity.createdBy = role.createdBy
        roleEntity.deletedAt = role.deletedAt
        roleEntity.deletedBy = role.deletedBy
        roleEntity.updatedAt = role.updatedAt
        roleEntity.updatedBy = role.updatedBy
        return roleEntity
    }
    private toRolePermission(rolePermissionEntity: RolePermissionEntity): RolePermission {
        const rolePermission: RolePermission = new RolePermission()

        rolePermission.id = rolePermissionEntity.id
        rolePermission.permissionId = rolePermissionEntity.permissionId
        rolePermission.permissionName = rolePermissionEntity.permissionName
        rolePermission.roleId = rolePermissionEntity.roleId

        rolePermission.createdAt = rolePermissionEntity.createdAt
        rolePermission.createdBy = rolePermissionEntity.createdBy
        rolePermission.deletedAt = rolePermissionEntity.deletedAt
        rolePermission.deletedBy = rolePermissionEntity.deletedBy
        rolePermission.updatedAt = rolePermissionEntity.updatedAt
        rolePermission.updatedBy = rolePermissionEntity.updatedBy
        return rolePermission
    }
    private toRolePemissionEntity(rolePermission: RolePermission): RolePermissionEntity {
        const rolePermissionEntity: RolePermissionEntity = new RolePermissionEntity()

        rolePermissionEntity.id = rolePermission.id
        rolePermissionEntity.permissionId = rolePermission.permissionId
        rolePermissionEntity.permissionName = rolePermission.permissionName
        rolePermissionEntity.roleId = rolePermission.roleId

        rolePermissionEntity.createdAt = rolePermission.createdAt
        rolePermissionEntity.createdBy = rolePermission.createdBy
        rolePermissionEntity.deletedAt = rolePermission.deletedAt
        rolePermissionEntity.deletedBy = rolePermission.deletedBy
        rolePermissionEntity.updatedAt = rolePermission.updatedAt
        rolePermissionEntity.updatedBy = rolePermission.updatedBy
        return rolePermissionEntity
    }
}