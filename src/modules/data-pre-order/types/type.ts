export interface PreOrderType {
    _id?: string;
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    orderDate: string;
    deliveryDate?: string;
    status: string;
    totalAmount: number;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface PreOrderResponse {
    code: number;
    status: string;
    message: string;
    data: PreOrderType[];
}

export interface PreOrderCreate {
    orderNumber: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    orderDate: string;
    deliveryDate?: string;
    status: string;
    totalAmount: number;
    notes?: string;
}



