export interface CustomerType {
    _id?: string;
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface CustomerResponse {
    code: number;
    status: string;
    message: string;
    data: CustomerType[];
}

export interface CustomerCreate {
    name: string;
    email: string;
    phone: string;
    address: string;
}

