import { MoneyModel } from "./money.model";

export class AddShoppingCartModel{
    bookId: number = 0;
    price: MoneyModel = new MoneyModel();
    quantity: number = 0;
    appUserId: number = 0;
}