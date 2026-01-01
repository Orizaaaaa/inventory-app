export interface VendorType {
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

export interface VendorResponse {
    code: number;
    status: string;
    message: string;
    data: VendorType[];
}

export interface VendorCreate {
    name: string;
    email: string;
    phone: string;
    address: string;
}

