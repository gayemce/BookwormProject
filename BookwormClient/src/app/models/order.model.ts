import { OrderDetailModel } from "./order-detail.model";

export class OrderModel {
    id: number = 0; 
    orderNumber: string = "";
    productQuantity: number = 0;
    createdAt: string = "";
    paymentMethodEn: string = "";
    paymentMethodTr: string = "";
    totalPrice: number = 0;
    statusEn: string = "";
    statusTr: string = "";
    priceCurrency: string = "";
    books: OrderDetailModel[] = [];
    paymentCurrency: string = "";
}