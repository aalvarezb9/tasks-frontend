import { TaskStatus } from "./task-status.model";

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
    categoryId?: string;
    color?: string;
    categoryName?: string;
}