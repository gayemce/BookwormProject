import { BookCoverTypeEnumEn } from "./book-cover-type-en.enum";
import { BookCoverTypeEnumTr } from "./book-cover-type-tr.enum";

export class BookDetailsModel {
    id: number = 0;
    bookId: number = 0;
    coverTypeEn: BookCoverTypeEnumEn = 0;
    coverTypeTr: BookCoverTypeEnumTr = 0;
    coverFormatTr: string = "";
    iSBN: string = "";
    publicationDate: string = "";
    publicationCityCountry: string = "";
    languageId: number = 0;
    languageEn: string = "";
    languageTr: string = "";
}