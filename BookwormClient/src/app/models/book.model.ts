import { AuthorModel } from "./author.model";
import { BookDetailsModel } from "./book-detail.model";
import { BookLanguageModel } from "./book-language.model";
import { MoneyModel } from "./money.model";

export class BookModel {
    id: number = 0;
    authorId: number = 0;
    author: AuthorModel = new AuthorModel();
    bookLanguage: BookLanguageModel = new BookLanguageModel();
    bookDetail: BookDetailsModel = new BookDetailsModel();
    bookDetailId: number = 0;
    title: string = "";
    descriptionEn: string = "";
    descriptionTr: string = "";
    publisher: string = "";
    price: MoneyModel = new MoneyModel();
    quantity: number = 0; 
    imgUrl: string = "";
    isActive: boolean = true; 
    isDeleted: boolean = false; 
    createdAt: string = ""; 
    cartId: number = 0;
    wishListId: number = 0;
 }