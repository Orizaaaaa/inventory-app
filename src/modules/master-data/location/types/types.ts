export interface LocationType {
    _id?: string;
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface LocationResponse {
    code: number;
    status: string;
    message: string;
    data: LocationType[];
}

export interface LocationCreate {
    name: string;
}

