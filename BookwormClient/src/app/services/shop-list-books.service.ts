import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { AuthorModel } from '../models/author.model';
import { CategoryModel } from '../models/category.model';
import { RequestModel } from '../models/request.model';
import { SelectedLanguageService } from './selected-language.service';
import { BookDetailsModel } from '../models/book-detail.model';
import { TranslateService } from '@ngx-translate/core';
import { BookLanguageModel } from '../models/book-language.model';


@Injectable({
  providedIn: 'root'
})
export class ShopListBooksService {

  response: any;
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategory: string = "";
  books: BookModel[] = [];
  category: CategoryModel[] = [];
  author: AuthorModel[] = [];
  searchAuthor: string = "";
  bookDetails: BookDetailsModel[] = [];
  featuredBooks: BookModel[] = [];
  bookLanguages: BookLanguageModel[] = [];


  constructor(
    private router: Router,
    private http: HttpClient,
    private error: ErrorService,
    private translate: TranslateService,
    public selectLang: SelectedLanguageService
  ) {
    this.getAllCategories();
    this.getAllAuthors();
    this.getAllBookLanguages();
    this.getFeaturedBooks();
    this.getAllBooks();
  }

  getTranslatedResultCountEn(): string {
    const translationKey = 'results';
    const showingText = this.translate.instant('showing');
    const ofText = this.translate.instant('of');

    return `${showingText} 1-${this.response.data.length} ${this.translate.instant(translationKey)}`
  }

  getTranslatedResultCountTr(): string {
    const translationKey = 'results';
    const showingText = this.translate.instant('showing');
    const ofText = this.translate.instant('of');

    return `1-${this.response.data.length} ${ofText} ${this.translate.instant(translationKey)} ${showingText}`
  }


  goToShopListByCategoryId(categoryId: number) {
    this.request.categoryId = categoryId;
    this.router.navigate(['/shop-list', categoryId]);
    this.getAllCategories();
    this.getAllAuthors();
    this.getAllBooks();
  }

  languageCheckboxChange(event: any, languageId: number): void {
    if (!event.target.checked) {
      this.changeLanguage(null);
    } else {
      this.changeLanguage(languageId);
    }
  }

  changeSorting() {
    this.getAllBooks();
  }

  changePageSize() {
    this.getAllBooks(1);
  }

  changeLanguage(languageId: number | null = null) {
    this.request.languageId = languageId;
    this.getAllBooks(1);
  }

  // changeSearch(){
  //   this.getAllBooks(1);
  // }

  getAllBooks(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this.http.post(`https://localhost:7018/api/Books/GetAllBooks`, this.request).subscribe({
      next: (res: any) => {
        this.response = res;
        this.setPageNumber();
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  setPageNumber() {
    this.pageNumbers = [];
    for (let i = 0; i < this.response.totalPageCount; i++) {
      this.pageNumbers.push(i + 1);
    }
  }

  getAllBookLanguages() {
    this.http.get("https://localhost:7018/api/BookLanguages/GetAllLanguages").subscribe({
      next: (res: any) => {
        this.bookLanguages = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  changeAuthor(authorId: number | null = null) {
    this.request.authorId = authorId;
    this.getAllBooks(1);
  }

  getAllAuthors() {
    this.request.search = this.searchAuthor;

    this.http.post("https://localhost:7018/api/Authors/GetAllAuthors", this.request).subscribe({
      next: (res: any) => {
        this.author = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  changeCategory(categoryId: number | null = null) {
    this.request.categoryId = categoryId;
    this.getAllBooks(1);
  }

  getAllCategories() {
    this.http.get("https://localhost:7018/api/Categories/GetAllCategories").subscribe({
      next: (res: any) => {
        this.category = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  getFeaturedBooks() {
    this.http.get("https://localhost:7018/api/Home/GetFeaturedBooks").subscribe({
      next: (res: any) => {
        this.featuredBooks = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }
}
