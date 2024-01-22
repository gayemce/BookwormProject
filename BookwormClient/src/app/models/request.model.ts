export class RequestModel{
    authorId: number | null = null;
    categoryId: number | null = null;
    languageId: number | null = null;
    pageNumber: number = 1;
    pageSize: number = 10;
    search: string = "";
    orderBy: string = "default";
}