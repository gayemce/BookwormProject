import { AuthorModel } from "./author.model";
import { BookDetailsModel } from "./bookDetail.model";
import { Money } from "./money.model";

export class BookModel {
    id: number = 0;
    authorId: number = 0;
    author: AuthorModel = new AuthorModel();
    bookDetails: BookDetailsModel[] = [];
    bookDetailId: number = 0;
    title: string = "";
    descriptionEn: string = "";
    descriptionTr: string = "";
    publisher: string = "";
    price: Money = new Money();
    imgUrl: string = "";
    quantity: number = 0; 
    isActive: boolean = true; 
    isDeleted: boolean = false; 
    createdAt: string = ""; 
 }