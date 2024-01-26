import { MoneyModel } from "./money.model";

export class AddToWishListModel{
    bookId: number = 0;
    appUserId: number = 0;
    price: MoneyModel = new MoneyModel();
}