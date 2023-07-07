/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "src/registration/persistence/roles/role.entity";
import { RoleResponse } from "./role.response";
@Injectable()
export class RoleQueries {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {
    }

    async fecthRole(): Promise<RoleResponse[]> {
        const result = await this.roleRepository.find();
        console.log(result)
        // const result = await this.userRepository.findAll();
        if (!result) {
            throw new NotFoundException(`There is no Role  !!`);
        }
        return result.map((element) => RoleResponse.fromEntity(element))
    }
    async getRoleById(roleId: string): Promise<RoleResponse> {
        const result = await this.roleRepository.findOne({ where:{id: roleId },relations:["rolePermission"]})
        console.log(result)
        if (!result) {
            throw new NotFoundException(`Role with Id ${roleId} is not found`);
        }
        return RoleResponse.fromEntity(result)
    }
    async getArchivedRole(): Promise<RoleResponse[]> {
        const queryBuilder = this.roleRepository.createQueryBuilder('role')
        queryBuilder.withDeleted().where('role.deletedAt is not null')
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived role  not found`);
        }
        return result.map((element) => RoleResponse.fromEntity(element))
    }
    async getArchivedRoleByRoleId(roleId:string): Promise<RoleResponse> {
        const queryBuilder = this.roleRepository.createQueryBuilder('role')
        queryBuilder.withDeleted().where('role.deletedAt is not null').andWhere('role.id=:id',{roleId})
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getOne()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived role  not found`);
        }
        return RoleResponse.fromEntity(result)
    }
}