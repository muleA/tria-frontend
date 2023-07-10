/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

import {
    BadRequestException,
    NotFoundException,
    Inject,
    Logger,
} from "@nestjs/common";
import { Role } from "src/registration/domain/employee/role";
import { RoleRepository } from "src/registration/persistence/roles/role.repository";
import { AssignEmployeeToRoleCommand, CreateRoleCommand, CreateRolePermissionCommand, UpdateRoleCommand } from "./role.commands";
import { RoleResponse } from "./role.response";
import { CreatePermissionCommand } from "../permission.commands/permission.commands";

@Injectable()
export class RoleCommand {
    private roleDomain: Role = new Role()
    private logger = new Logger("RoleService")
    constructor(
        private roleRepository: RoleRepository,

    ) { }

    async createRole(command: CreateRoleCommand): Promise<RoleResponse> {
        try {
            const roleEntity = CreateRoleCommand.fromCommands(command)
            console.log(roleEntity)
            this.roleDomain = await this.roleRepository.insertRole(roleEntity)
            if (!this.roleDomain) {

                throw new NotFoundException(`Failed to create Role`);
            }
            return RoleResponse.fromDomain(this.roleDomain)
        } catch (error) {
            Logger.log('Unable to create the role because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveRole(roleId: string): Promise<boolean> {
        try {
            this.roleDomain = await this.roleRepository.findById(roleId)
            if (!this.roleDomain) {
                throw new NotFoundException(`Role with Id ${roleId} is not found `);
            }
            const result = this.roleRepository.softDeleteRole(this.roleDomain.id)
            this.logger.log(
                "Archive Role command executed ",
                `role  ${this.roleDomain.id} have been Archived`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Archive the role because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveRole(roleId: string): Promise<boolean> {
        try {
            const result = await this.roleRepository.restoreRole(
                roleId
            );
            this.logger.log(
                "Restore Role execute",
                `role ${roleId} have been restored`
            );
            return result;
        } catch (error) {
            this.logger.log(`unable to retore role ${roleId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateRole(updateRoleCommand: UpdateRoleCommand): Promise<RoleResponse> {
        try {
            this.roleDomain = await this.roleRepository.findById(updateRoleCommand.id)
            if (!this.roleDomain) {
                throw new NotFoundException(`User with Id ${updateRoleCommand.id} is not found `);
            }
            this.roleDomain = UpdateRoleCommand.fromCommands(updateRoleCommand);
            const result = await this.roleRepository.updateRole(this.roleDomain)
            this.logger.log(
                "Update role command executed ",
                `role  ${this.roleDomain.id} have been updated`
            );
            return RoleResponse.fromDomain(result)
        } catch (error) {
            Logger.log('Unable to update the role because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteRole(roleId: string): Promise<boolean> {
        try {
            this.roleDomain = await this.roleRepository.findById(roleId)
            if (!this.roleDomain) {
                throw new NotFoundException(`Role with Id ${roleId} is not found `);
            }
            const result = this.roleRepository.deleteById(this.roleDomain.id)
            this.logger.log(
                "Delete role command executed ",
                `role  ${this.roleDomain.id} have been Deleted`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Delete the role because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async addPermissionToRole(createRolePermissionCommand: CreateRolePermissionCommand , roleId): Promise<RoleResponse> {
        try {
            this.roleDomain = await this.roleRepository.findById(roleId)
            if (!this.roleDomain) {
                throw new NotFoundException(`Role with Id ${roleId} is not found `);
            }
            this.roleDomain.rolePermission = [];
            for (const permission of createRolePermissionCommand.permissions) {
                createRolePermissionCommand.permissionId=permission.permissionId
                createRolePermissionCommand.permissionName=permission.permissionName
                createRolePermissionCommand.roleId=roleId
                const rolePermissionCommand  = CreateRolePermissionCommand.fromCommands(createRolePermissionCommand);
                this.roleDomain.rolePermission.push(rolePermissionCommand)
            }
            
            const result = await this.roleRepository.updateRole(this.roleDomain)
            console.log("the role domain is : ",result)

            this.logger.log(
                "Update role command executed ",
                `role  ${this.roleDomain.id} have been updated`
            );
            return RoleResponse.fromDomain(result)
        } catch (error) {
            Logger.log('Unable to update the role because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }

}