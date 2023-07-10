import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ServicesServiceCommands } from '../services/services.service.commands';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FormResponse } from '../usecases/form.response';
import { ServicesServiceQuries } from '../services/service.usecase.quries';
import { EmployeeResponse } from 'src/registration/useCases/employee.commands.ts/employee.responses';
import { CreateFormCommand, UpdateFormCommand } from '../usecases/form.commands';
import { CreateFormAttributeCommand } from '../usecases/formAttribute.command';
import { CreateTaskCommand } from 'src/Task/task/usecases/task.commands';

@Controller('controllers')
@ApiTags('Form')
export class ControllersController {
    constructor(
        private commands: ServicesServiceCommands,
        private queries: ServicesServiceQuries
    ) { }
    @Get("get-forms")
    @ApiOkResponse({ type: FormResponse })
    async getForm() {
        return await this.queries.fecthForms()
    }
    // @UseGuards(JwtAuthGuard)
    @Post("create-form")
    @ApiOkResponse({ type: FormResponse })
    async createForm(
        @Body() createFormCommand: CreateFormCommand
    ) {
        console.log(createFormCommand)
        return await this.commands.createForm(createFormCommand);
    }
    @Post("create-form")
    @ApiOkResponse({ type: FormResponse })
    async createTask(
        @Body() createTask: CreateTaskCommand
    ) {
        console.log(createTask)
        return await this.commands.createTask(createTask);
    }
    @Get("get-form/:formId")
    @ApiOkResponse({ type: EmployeeResponse })
    async getEmployeeId(@Param('formId') formId: string) {
        return await this.queries.getFormById(formId)
    }
    @Get("get-archived-forms")
    @ApiOkResponse({ type: FormResponse })
    async getArchivedForms() {
        return await this.queries.getArchivedForms()
    }
    @Get("get-archived-forms-by-id/:formId")
    @ApiOkResponse({ type: EmployeeResponse })
    async getArchivedFormById(@Param('formId') formId: string) {
        console.log(formId)
        return await this.queries.getArchivedFormById(formId)
    }
    @Post("archive-Form/:formId")
    @ApiOkResponse({ type: Boolean })
    async archiveFormById(@Param('formId') formId: string) {
        return await this.commands.archiveForm(formId)
    }
    @Post("restore-form/:formId")
    @ApiOkResponse({ type: Boolean })
    async restoreFormById(@Param('formId') formId: string) {
        return await this.commands.unArchiveForm(formId)
    }
    @Post("delete-form/:formId")
    @ApiOkResponse({ type: Boolean })
    async deleteFomById(@Param('formId') formId: string) {
        return await this.commands.deleteForm(formId)
    }
    @Post("update-form")
    @ApiOkResponse({ type: FormResponse })
    async updateForm(@Body() updateFormCommand: UpdateFormCommand) {
        return await this.commands.updateForm(updateFormCommand)
    }

    @Post("add-formAttribute-to-form/:formId")
    @ApiOkResponse({ type: FormResponse })
    async addFormAttributeToForm(
        @Param('formId') formId: string,
        @Body() createFormAttributeCommand: CreateFormAttributeCommand[]) {
            console.log('createFormAttributeCommand ',createFormAttributeCommand)
        return await this.commands.addFormAttributeToForm(createFormAttributeCommand, formId)
    }
    @Post("create-form-attribute")
    @ApiOkResponse({ type: FormResponse })
    async createFormAttribute(
        // @Param('formId') formId: string,
        @Body() createFormAttributeCommand: CreateFormAttributeCommand) {
        // return await this.commands.addFormAttributeToForm(createFormAttributeCommand, formId)
    }
    @Post("update-form-attribute")
    @ApiOkResponse({ type: FormResponse })
    async updateFormAttribute(
        @Body() createFormAttributeCommand: CreateFormAttributeCommand) {
        return await this.commands.updateFormAttributeFromForm(createFormAttributeCommand)
    }
    @Post("remove-form-attribute/:formAttributeId/formId")
    @ApiOkResponse({ type: FormResponse })
    async removeFormAttribute(
        @Param('formAttributeId') formAttributeId: string,
        @Param('formId') formId: string,
        @Body() createFormAttributeCommand: CreateFormAttributeCommand) {
        return await this.commands.deleteFormAttributeFromForm(formAttributeId, formId)
    }
    @Post("remove-form-attribute/:formAttributeId/formId")
    @ApiOkResponse({ type: FormResponse })
    async archiveFormAttribute(
        @Param('formAttributeId') formAttributeId: string,
        @Param('formId') formId: string,
        ) {
        return await this.commands.deleteFormAttributeFromForm(formAttributeId, formId)
    }
    @Post("remove-form-attribute/:formAttributeId/formId")
    @ApiOkResponse({ type: FormResponse })
    async restorFormAttribute(
        @Param('formAttributeId') formAttributeId: string,
        @Param('formId') formId: string,
        ) {
        return await this.commands.deleteFormAttributeFromForm(formAttributeId, formId)
    }
    /**
     * {
  "roleName": "string",
  "roleId": [
    "string"
  ],
  "createdAt": "2023-05-29T09:53:55.628Z"
}
     */
    @Get("get-form-attribute-by-formId/:formId")
    @ApiOkResponse({ type: EmployeeResponse })
    async getRoleByEmployeeId(@Param('formId') formId: string) {
        console.log(formId)
        return await this.queries.getFormAttributesByFormId(formId)
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
