/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { IRoleRepository } from "src/registration/domain/employee/role.repository.interface";
import { Role } from "src/registration/domain/employee/role";
import { EmployeeRoleEntity } from "../Employee/employee-role.entity";
import { EmployeeRole } from "src/registration/domain/employee/employee-role";
import { PermissionEntity } from "./permission.entity";
import { Permission } from "src/registration/domain/permission/permission";

export class PermissionRepository implements PermissionRepository {
    constructor(
        @InjectRepository(PermissionEntity)
        private permissionRepository: Repository<PermissionEntity>,
    ) {
        //  super()
    }
    async insertPermission(permission: Permission): Promise<Permission> {
        try {
            const permissionEntity = this.toPermissionEntity(permission)
            const result = await this.permissionRepository.save(permissionEntity)
            return result ? this.toPermission(result) : null;
        } catch (error) {
            Logger.log(error)
        }
    }
    async updatePermission(permission: Permission): Promise<Permission> {
        const permissionEntity = this.toPermissionEntity(permission)
        const result = await this.permissionRepository.save(permissionEntity)
        return result ? this.toPermission(result) : null;
    }
    async findAll(): Promise<Permission[]> {
        const result = await this.permissionRepository.find()
        return result ? result.map((element) => this.toPermission(element)) : null
    }
    async findById(id: string): Promise<Permission> {
        try {
            const result = await this.permissionRepository.find({ where: { id: id } })
            return this.toPermission(result[0])
        } catch (error) {
            Logger.log(` Role with Id ${id} is not found`)
        }

    }
    async deleteById(id: string): Promise<boolean> {
        const result = await this.permissionRepository.delete(id)
        if (result.affected > 0) return true;
        return false;
    }
    async softDeletePermission(permissionID: string): Promise<boolean> {
        const result = await this.permissionRepository.softDelete(permissionID)
        if (result.affected > 0) return true;
        return false;
    }
    async restorePermission(permissionID: string): Promise<boolean> {
        const result = await this.permissionRepository.restore(permissionID)
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
    private toPermission(permissionEntity: PermissionEntity): Permission {
        const permission: Permission = new Permission()

        permission.id = permissionEntity.id
        permission.name = permissionEntity.name
        permission.description = permissionEntity.description
        permission.isActive = permissionEntity.isActive
        permission.key = permissionEntity.key
        // permission.rolePermissions = permissionEntity.rolePermissions

        permission.createdAt = permissionEntity.createdAt
        permission.createdBy = permissionEntity.createdBy
        permission.deletedAt = permissionEntity.deletedAt
        permission.deletedBy = permissionEntity.deletedBy
        permission.updatedAt = permissionEntity.updatedAt
        permission.updatedBy = permissionEntity.updatedBy
        return permission
    }
    private toPermissionEntity(permission: Permission): PermissionEntity {
        const permissionEntity: PermissionEntity = new PermissionEntity()
        permissionEntity.id = permission.id
        permissionEntity.name = permission.name
        permissionEntity.description = permission.description
        permissionEntity.isActive = permission.isActive
        permissionEntity.key = permission.key
        // permissionEntity.rolePermissions = permission.rolePermissions

        permissionEntity.createdAt = permission.createdAt
        permissionEntity.createdBy = permission.createdBy
        permissionEntity.deletedAt = permission.deletedAt
        permissionEntity.deletedBy = permission.deletedBy
        permissionEntity.updatedAt = permission.updatedAt
        permissionEntity.updatedBy = permission.updatedBy
        return permissionEntity
    }
    // private toRole(roleEntity: RoleEntity): Role {
    //     const role: Role = new Role()

    //     role.id = roleEntity.id
    //     role.name = roleEntity.name
    //     role.key = roleEntity.key
    //     role.isDefault = roleEntity.isDefault
    //     role.description = roleEntity.description
    //     role.employeeRole = roleEntity?.employeeRole?.map((element) => this.toEmployeeRole(element))

    //     role.createdAt = roleEntity.createdAt
    //     role.createdBy = roleEntity.createdBy
    //     role.deletedAt = roleEntity.deletedAt
    //     role.deletedBy = roleEntity.deletedBy
    //     role.updatedAt = roleEntity.updatedAt
    //     role.updatedBy = roleEntity.updatedBy
    //     return role
    // }
    // private toRoleEntity(role: Role): RoleEntity {
    //     const roleEntity: RoleEntity = new RoleEntity()

    //     roleEntity.id = role?.id
    //     roleEntity.name = role.name
    //     roleEntity.key = role.key
    //     roleEntity.isDefault = role.isDefault
    //     roleEntity.description = role.description
    //     // roleEntity.employeeRole = role?.employeeRole?.map((element) => this.toEmployeeRoleEntity(element))

    //     roleEntity.createdAt = role.createdAt
    //     roleEntity.createdBy = role.createdBy
    //     roleEntity.deletedAt = role.deletedAt
    //     roleEntity.deletedBy = role.deletedBy
    //     roleEntity.updatedAt = role.updatedAt
    //     roleEntity.updatedBy = role.updatedBy
    //     return roleEntity
    // }

}