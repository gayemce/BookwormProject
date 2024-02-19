import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export class CreateReviewModel{
    bookId: number = 0;
    appUserId: number = 0;
    appUser: UserModel = new UserModel();
    raiting: number = 0;
    title: string = "";
    comment: string = "";
}