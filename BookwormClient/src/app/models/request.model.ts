export class RequestModel{
    authorId: number | null = null;
    categoryId: number | null = null;
    languageId: number | null = null;
    languageEn: string = "";
    languageTr: string = "";
    pageNumber: number = 1;
    pageSize: number = 3;
    search: string = "";
    orderBy: string = "default";
}