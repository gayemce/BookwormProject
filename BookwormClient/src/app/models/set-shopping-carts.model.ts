import { MoneyModel } from "./money.model";

export class SetShoppingCartsModel {
    bookId: number = 0;
    appUserId: number = 0;
    quantity: number = 0;
    price: MoneyModel = new MoneyModel();
}