// /* eslint-disable prettier/prettier */
// import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { AssignEmployeeToRoleCommand, CreateRoleCommand, CreateRolePermissionCommand, UpdateRoleCommand } from 'src/registration/useCases/employee.commands.ts/role.commands';
// import { RoleResponse } from 'src/registration/useCases/employee.commands.ts/role.response';
// import { RoleQueries } from 'src/registration/useCases/employee.commands.ts/role.usecase.queries';
// import { RoleCommand } from 'src/registration/useCases/employee.commands.ts/role.usecases.command';
// import { CreatePermissionCommand } from 'src/registration/useCases/permission.commands/permission.commands';

// @Controller('role')
// @ApiTags('Role')
// export class RoleController {

//     constructor(
//         private commands: RoleCommand,
//         private queries: RoleQueries
//     ){}

//     @Get("get-roles")
//     @ApiOkResponse({ type: RoleResponse })
//     async getRoles() {
//         return await this.queries.fecthRole()
//     }

//     @Get("get-role-by-roleId/:roleId")
//     @ApiOkResponse({ type: RoleResponse })
//     async getRoleById(@Param('roleId') roleId: string) {
//         return await this.queries.getRoleById(roleId)
//     }
//     @Get("get-archived-Roles")
//     @ApiOkResponse({ type: Boolean })
//     async getArchivedUser() {
//         return await this.queries.getArchivedRole()
//     }
//     @Get("get-archived-role-by-roleId/:roleId")
//     @ApiOkResponse({ type: Boolean })
//     async getArchivedRoleById(@Param('roleId')roleId:string) {
//         return await this.queries.getArchivedRoleByRoleId(roleId)
//     }
//     @Post("create-role")
//     @ApiOkResponse({ type: RoleResponse })
//     async createRole(
//         @Body() createRoleCommand: CreateRoleCommand
//     ) {
//         // console.log(createRoleCommand)
//         return await this.commands.createRole(createRoleCommand);
//     }
//     @Post("archive-role/:roleId")
//     @ApiOkResponse({ type: Boolean })
//     async archiveRoleByRoleId(@Param('roleId') roleId: string) {
//         return await this.commands.archiveRole(roleId)
//     }
//     @Post("restore-role/:roleId")
//     @ApiOkResponse({ type: Boolean })
//     async restoreRoleByRoleId(@Param('roleId') roleId: string) {
//         return await this.commands.unArchiveRole(roleId)
//     }
//     @Post("delete-role/:roleId")
//     @ApiOkResponse({ type: Boolean })
//     async deleteRoleByRoleId(@Param('roleId') roleId: string) {
//         return await this.commands.deleteRole(roleId)
//     }
//     @Post("update-role")
//     @ApiOkResponse({ type: RoleResponse })
//     async updateRole(@Body() updateRoleCommand: UpdateRoleCommand) {
//         return await this.commands.updateRole(updateRoleCommand)
//     }
//     @Post("add-permission-to-role/:roleId")
//     @ApiOkResponse({ type: RoleResponse })
//     async addPermissionToRole(
//         @Param('roleId') roleId:string,
//         @Body() createRolePermissionCommand: CreateRolePermissionCommand) {
//         return await this.commands.addPermissionToRole(createRolePermissionCommand,roleId)
//     }

// }
