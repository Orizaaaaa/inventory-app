export interface NotaType {
    _id?: string;
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface NotaResponse {
    code: number;
    status: string;
    message: string;
    data: NotaType[];
}

export interface NotaCreate {
    name: string;
}

