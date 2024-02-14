import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export class ReviewModel{
    id: number = 0;
    bookId: number = 0;
    book: BookModel = new BookModel();
    appUserId: number = 0;
    appUser: UserModel = new UserModel();
    raiting: number = 0;
    titleEn: string = "";
    titleTr: string = "";
    commentEn: string = "";
    commentTr: string = "";
    createdAt: string = "";
}