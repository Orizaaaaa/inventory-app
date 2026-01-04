export interface BahanBakuType {
    _id?: string;
    id: string;
    name: string;
    code: string;
    unit: string;
    stock: number;
    location: string;
    supplier?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface BahanBakuResponse {
    code: number;
    status: string;
    message: string;
    data: BahanBakuType[];
}

export interface BahanBakuCreate {
    name: string;
    code: string;
    unit: string;
    stock: number;
    location: string;
    supplier?: string;
}



