import { OrderDetailModel } from "./order-detail.model";

export class OrderModel {
    id: number = 0; 
    orderNumber: string = "";
    productQuantity: number = 0;
    createdAt: string = "";
    paymentMethodEn: string = "";
    paymentMethodTr: string = "";
    statusEn: string = "";
    statusTr: string = "";
    paymentCurrency: string = "";
    books: OrderDetailModel[] = [];
}