/* eslint-disable prettier/prettier */
import { Employee } from "./employee";

export interface IEmployeeRepository {
    insertEmployee(employee: Employee): Promise<Employee>;
    findAll(): Promise<Employee[]>;
    findById(id: string): Promise<Employee>;
    updateEmployee(employee: Employee): Promise<Employee>;
    deleteById(id: string): Promise<boolean>;
    softDeleteEmployee(employeeID: string): Promise<boolean>;
    restoreEmployee(employeeID: string): Promise<boolean>;
}