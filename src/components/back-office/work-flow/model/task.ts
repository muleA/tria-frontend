export interface Task<T = string> {
    id: number;
    label: string;
    type: T;
}

export interface TaskState<T = string> {
    taskList: Task<T>[];
}