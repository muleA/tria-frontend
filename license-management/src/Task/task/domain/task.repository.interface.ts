/* eslint-disable prettier/prettier */

import { Task } from "./task";

export interface ITaskRepository {
    insertTask(task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task>;
    updateTask(task: Task): Promise<Task>;
    deleteById(id: string): Promise<boolean>;
    softDeleteTask(taskId: string): Promise<boolean>;
    restoreTask(taskId: string): Promise<boolean>;
}