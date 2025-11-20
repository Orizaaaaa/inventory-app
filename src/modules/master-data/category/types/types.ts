export interface CategoryType {
    _id?: string;
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface CategoryResponse {
    code: number;
    status: string;
    message: string;
    data: CategoryType[];
}

export interface CategoryCreate {
    name: string;
}