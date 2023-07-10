// import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { PermissionCommand } from '../../useCases/permission.commands/permission.usecases.command';
// import { PermissionQueries } from '../../useCases/permission.commands/permission.usecase.queries';
// import { PermissionResponse } from '../../useCases/permission.commands/permission.response';
// import { CreatePermissionCommand, UpdatePermissionCommand } from '../../useCases/permission.commands/permission.commands';

// @Controller('permission')
// @ApiTags('Permission')
// export class PermissionController {
//     constructor(
//         private commands: PermissionCommand,
//         private queries: PermissionQueries
//     ){}
//     @Get("get-permissions")
//     @ApiOkResponse({ type: PermissionResponse })
//     async getpermissions() {
//         return await this.queries.fecthPermission()
//     }

//     @Get("get-permission-by-roleId/:roleId")
//     @ApiOkResponse({ type: PermissionResponse })
//     async getpermissionByRoleId(@Param('roleId') roleId: string) {
//         return await this.queries.getPermissionByRoleId(roleId)
//     }
//     @Get("get-permission-by-Id/:permissionId")
//     @ApiOkResponse({ type: PermissionResponse })
//     async getpermissionId(@Param('permissionId') roleId: string) {
//         return await this.queries.getPermissionById(roleId)
//     }
    
//     @Get("get-archived-permissions")
//     @ApiOkResponse({ type: Boolean })
//     async getArchivedUser() {
//         return await this.queries.getArchivedPermission()
//     }
//     @Get("get-archived-permission-by-permissionId/:permissionId")
//     @ApiOkResponse({ type: Boolean })
//     async getArchivedRoleById(@Param('permissionId')permissionId:string) {
//         return await this.queries.getArchivedPermissionById(permissionId)
//     }
//     @Post("create-permission")
//     @ApiOkResponse({ type: PermissionResponse })
//     async createRole(
//         @Body() createPermissionCommand: CreatePermissionCommand
//     ) {
//         // console.log(createRoleCommand)
//         return await this.commands.createPermission(createPermissionCommand);
//     }
//     @Post("archive-permission/:permissionId")
//     @ApiOkResponse({ type: Boolean })
//     async archivePermissionById(@Param('roleId') roleId: string) {
//         return await this.commands.archivePermission(roleId)
//     }
//     @Post("restore-permission/:permissionId")
//     @ApiOkResponse({ type: Boolean })
//     async restoreRoleByRoleId(@Param('permissionId') permissionId: string) {
//         return await this.commands.unArchivePermission(permissionId)
//     }
//     @Post("delete-permission/:permissionId")
//     @ApiOkResponse({ type: Boolean })
//     async deleteRoleByRoleId(@Param('permissionId') permissionId: string) {
//         return await this.commands.deletePermission(permissionId)
//     }
//     @Post("update-permission")
//     @ApiOkResponse({ type: PermissionResponse })
//     async updatePermission(@Body() updatePermissionCommand: UpdatePermissionCommand) {
//         return await this.commands.updatePermission(updatePermissionCommand)
//     }
// }
