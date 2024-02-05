import { BookModel } from "./book.model";
import { MoneyModel } from "./money.model";

export class OrderModel {
    id: number = 0; 
    orderNumber: string = "";
    bookId: number = 0; 
    book: BookModel = new BookModel();
    appUserId: number = 0;
    appUser: null = null;
    price: MoneyModel = new MoneyModel();
    quantity: number = 0;
    createdAt: string = ""; 
    paymentDate: string = "";
    paymentMethodEn: string = "";
    paymentMethodTr: string = "";
    paymentNumber: string = "";
    statusEn: string = "";
    statusTr: string = "";
}