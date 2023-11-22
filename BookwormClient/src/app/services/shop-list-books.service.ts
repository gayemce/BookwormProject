import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { AuthorModel } from '../models/author.model';
import { CategoryModel } from '../models/category.model';
import { RequestModel } from '../models/request.model';
import { SelectedLanguageService } from './selected-language.service';
import { BookDetailsModel } from '../models/bookDetail.model';


@Injectable({
  providedIn: 'root'
})
export class ShopListBooksService {

  request: RequestModel = new RequestModel();
  books: BookModel[] = []; 
  category: CategoryModel[] = [];
  author: AuthorModel[] = [];
  searchAuthor: string = "";
  bookDetails: BookDetailsModel[] = [] 

  constructor(
    private router: Router,
    private http: HttpClient,
    private error: ErrorService,
    public selectLang: SelectedLanguageService
    ) {
      this.getAllCategories();
    this.getAllAuthors();
    this.getAllBookLanguages();
   }

  goToShopListByCategoryId(categoryId: number) {
    this.request.categoryId = categoryId;
    this.router.navigate(['/shop-list', categoryId]);
    this.request.pageSize = 10;
    this.getAllCategories();
    this.getAllAuthors();
    this.getBooksByAuthorId();
  }

  getAllBookLanguages(){
    this.http.get("https://localhost:7018/api/BookDetails/GetAllBookDetail").subscribe({
      next: (res: any) => {
        this.bookDetails = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  changeAuthor(authorId: number | null = null){
    this.request.authorId = authorId;
    this.request.pageSize = 10;
    this.getBooksByAuthorId();
  }

  getBooksByAuthorId(){
    this.http.post<AuthorModel[]>("https://localhost:7018/api/Books/GetBooksByAuthorId", this.request).subscribe({
      next: (res: any) => {
        this.books = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  getAllAuthors(){
    this.request.search = this.searchAuthor;
    
    this.http.post("https://localhost:7018/api/Authors/GetAllAuthors", this.request).subscribe({
      next: (res: any) => {
        this.author = res;
        // this.getBooksByAuthorId();
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  changeCategory(categoryId: number | null = null){
    this.request.categoryId = categoryId;
    this.request.pageSize = 10;
    this.getBooksByCategoryId();
  }

  getBooksByCategoryId() {
    this.http.post<BookModel[]>("https://localhost:7018/api/Books/GetBooksByCategoryId", this.request).subscribe({
      next: (res: any) => {
        this.books = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }

  getAllCategories(){
    this.http.get("https://localhost:7018/api/Categories/GetAllCategories").subscribe({
      next: (res: any) => {
        this.category = res;
        this.getBooksByCategoryId();
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }
}
