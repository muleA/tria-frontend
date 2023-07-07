/* eslint-disable prettier/prettier */

import { Form } from "./form";

export interface IFormRepository {
    insertForm(form: Form): Promise<Form>;
    findAll(): Promise<Form[]>;
    findById(id: string): Promise<Form>;
    updateForm(form: Form): Promise<Form>;
    deleteById(id: string): Promise<boolean>;
    softDeleteForm(formId: string): Promise<boolean>;
    restoreForm(formId: string): Promise<boolean>;
}