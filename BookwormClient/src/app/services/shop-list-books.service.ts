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


  constructor(
    private router: Router,
    private http: HttpClient,
    private error: ErrorService,
    public selectLang: SelectedLanguageService
  ) {
    this.getAllCategories();
    this.getAllAuthors();
    this.getAllBookLanguages();
    this.getFeaturedBooks();
    this.GetAllBooks();
  }

  goToShopListByCategoryId(categoryId: number) {
    this.request.categoryId = categoryId;
    this.router.navigate(['/shop-list', categoryId]);
    this.request.pageSize = 10;
    this.getAllCategories();
    this.getAllAuthors();
    this.getBooksByAuthorId();
  }

  // handleCheckboxChange(event: any, language: string): void {
  //   if (!event.target.checked) {
  //     this.changeLanguage('');
  //   } else {
  //     this.changeLanguage(language);
  //   }
  // }

  GetAllBooks(pageNumber = 5) {
    this.request.pageNumber = pageNumber;
    this.http
      .post(`https://localhost:7018/api/Books/GetAllBooks/`, this.request)
      .subscribe(res => {
        this.response = res;
        this.setPageNumber();
      })
  }

  setPageNumber() {
    this.pageNumbers = [];
    for (let i = 0; i < this.response.totalPageCount; i++) {
      this.pageNumbers.push(i + 1);
    }
  }

  changeLanguage(languageId: number | null = null) {
    this.request.languageId = languageId;
    this.request.pageSize = 10;
    this.getBooksByLanguageId();
  }

  getBooksByLanguageId() {
    this.http.post("https://localhost:7018/api/Books/getBooksByLanguageId", this.request).subscribe({
      next: (res: any) => {
        this.books = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  getAllBookLanguages() {
    this.http.get("https://localhost:7018/api/BookDetails/GetAllBookDetail").subscribe({
      next: (res: any) => {
        this.bookDetails = res;
        this.getBooksByLanguageId();
        console.log(this.bookDetails);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  changeAuthor(authorId: number | null = null) {
    this.request.authorId = authorId;
    this.request.pageSize = 10;
    this.getBooksByAuthorId();
  }

  getBooksByAuthorId() {
    this.http.post<AuthorModel[]>("https://localhost:7018/api/Books/GetBooksByAuthorId", this.request).subscribe({
      next: (res: any) => {
        this.books = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  getAllAuthors() {
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

  changeCategory(categoryId: number | null = null) {
    this.request.categoryId = categoryId;
    this.request.pageSize = 10;
    this.getBooksByCategoryId();
    // this.GetAllBooks(1); //Kategori değiştirilirse 1. sayfadan başlasın
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

  getAllCategories() {
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
