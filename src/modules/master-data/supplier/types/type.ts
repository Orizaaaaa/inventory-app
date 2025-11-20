export interface SupplierType {
    _id?: string;
    id: string;
    name: string;
    phone: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface SupplierResponse {
    code: number;
    status: string;
    message: string;
    data: SupplierType[];
}

export interface SupplierCreate {
    name: string;
    phone: string;
}