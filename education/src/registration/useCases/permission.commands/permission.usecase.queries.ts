/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEntity } from "src/registration/persistence/Permission/permission.entity";
import { PermissionResponse } from "./permission.response";
import { RoleEntity } from "src/registration/persistence/roles/role.entity";
import { RolePermissionResponse } from "../employee.commands.ts/rolePermission.response";
@Injectable()
export class PermissionQueries {
    constructor(
        @InjectRepository(PermissionEntity)
        private permissionRepository: Repository<PermissionEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {
    }
    async fecthPermission(): Promise<PermissionResponse[]> {
        const result = await this.permissionRepository.find();
        console.log(result)
        // const result = await this.userRepository.findAll();
        if (!result) {
            throw new NotFoundException(`There is no Permission  !!`);
        }
        return result.map((element) => PermissionResponse.fromEntity(element))
    }
    async getPermissionByRoleId(permissionId: string): Promise<RolePermissionResponse[]> {
        const result = await this.roleRepository.findOne({ where:{id: permissionId},relations:['rolePermission'] })
        if (!result) {
            throw new NotFoundException(`Permission with Id ${permissionId} is not found`);
        }
        return result.rolePermission?.map((element)=>RolePermissionResponse.fromEntity(element))
    }
    async getArchivedPermission(): Promise<PermissionResponse[]> {
        const queryBuilder = this.permissionRepository.createQueryBuilder('permission')
        queryBuilder.withDeleted().where('permission.deletedAt is not null')
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived Permission  not found`);
        }
        return result.map((element) => PermissionResponse.fromEntity(element))
    }
    async getArchivedPermissionById(permissionId:string): Promise<PermissionResponse[]> {
        const queryBuilder = this.permissionRepository.createQueryBuilder('permission')
        queryBuilder.withDeleted().where('permission.deletedAt is not null').andWhere('permission.id=:id',{permissionId})
        console.log(queryBuilder.getSql())
        const [result,count] = await queryBuilder.getManyAndCount()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived Permission  not found`);
        }
        return  result.map((element)=>PermissionResponse.fromEntity(element))
    }
    async getPermissionById(permissionId:string): Promise<PermissionResponse> {
        const result= await this.permissionRepository.findOneBy({id:permissionId})
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(` Permission  not found`);
        }
        return  PermissionResponse.fromEntity(result)
    }
}