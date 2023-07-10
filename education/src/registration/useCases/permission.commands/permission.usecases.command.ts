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
import { Permission } from "src/registration/domain/permission/permission";
import { PermissionRepository } from "src/registration/persistence/Permission/permission.repository";
import { CreatePermissionCommand, UpdatePermissionCommand } from "./permission.commands";
import { PermissionResponse } from "./permission.response";

@Injectable()
export class PermissionCommand {
    private permissionDomain: Permission = new Permission()
    private logger = new Logger("PermissionService")
    constructor(
        private permissionRepository: PermissionRepository,

    ) { }

    async createPermission(command: CreatePermissionCommand): Promise<PermissionResponse> {
        try {
            const permissionEntity = CreatePermissionCommand.fromCommands(command)
            console.log(permissionEntity)
            this.permissionDomain= await this.permissionRepository.insertPermission(permissionEntity)
            if (!this.permissionDomain) {

                throw new NotFoundException(`Failed to create Permission`);
            }
           
        } catch (error) {
            Logger.log('Unable to create the Permission because ', error)
            throw new BadRequestException(error.code, error.message);
        }
        return PermissionResponse.fromDomain(this.permissionDomain)
    }
    async archivePermission(permissionId: string): Promise<boolean> {
        try {
            this.permissionDomain = await this.permissionRepository.findById(permissionId)
            if (!this.permissionDomain) {
                throw new NotFoundException(`Role with Id ${permissionId} is not found `);
            }
            const result = this.permissionRepository.softDeletePermission(this.permissionDomain.id)   
            this.logger.log(
                "Archive Role command executed ",
                `role  ${this.permissionDomain.id} have been Archived`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Archive the role because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchivePermission(permissionId: string): Promise<boolean> {
        try {
            const result = await this.permissionRepository.restorePermission(
                permissionId
            );
            this.logger.log(
                "Restore Permission execute",
                `permission ${permissionId} have been restored`
            );
            return result;
        } catch (error) {
            this.logger.log(`unable to retore role ${permissionId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updatePermission(updatePermissionCommand: UpdatePermissionCommand): Promise<PermissionResponse> {
        try {
            this.permissionDomain = await this.permissionRepository.findById(updatePermissionCommand.id)
            if (!this.permissionDomain) {
                throw new NotFoundException(`User with Id ${updatePermissionCommand.id} is not found `);
            }
            this.permissionDomain = UpdatePermissionCommand.fromCommands(updatePermissionCommand)
            const result = await this.permissionRepository.updatePermission(this.permissionDomain)
            this.logger.log(
                "Update role command executed ",
                `role  ${this.permissionDomain.id} have been updated`
            );
            return PermissionResponse.fromDomain(result)
        } catch (error) {
            Logger.log('Unable to update the Permission because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deletePermission(permissionId: string): Promise<boolean> {
        try {
            this.permissionDomain = await this.permissionRepository.findById(permissionId)
            if (!this.permissionDomain) {
                throw new NotFoundException(`Role with Id ${permissionId} is not found `);
            }
            const result = this.permissionRepository.deleteById(this.permissionDomain.id)
            this.logger.log(
                "Delete role command executed ",
                `role  ${this.permissionDomain.id} have been Deleted`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Delete the role because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
   
}