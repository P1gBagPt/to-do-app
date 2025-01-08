export interface TodoListGetModel {
    id: string;
    created_at: Date;
    title: string;
    description?: string;
    updated_at: Date;
    deleted_at: Date;
    userId: string;
    state: number;
}

export interface TodoListCreatePostModel {
    title: string;
    description?: string;
    userId: string;
    state: number;
}

export interface TodoListPostModel {
    id?: string;
    title: string;
    created_at?: Date;
    description?: string;
    userId?: string;
    state: number;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface TodoCategories {
    id: string;
    name: string;
    color: string;
}