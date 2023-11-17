import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-deals-with-product-tab',
  templateUrl: './deals-with-product-tab.component.html',
  styleUrls: ['./deals-with-product-tab.component.css']
})
export class DealsWithProductTabComponent {
  
  books: BookModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService) {
    this.getAllBooks();
  }

  getAllBooks() {
    this.http.get<BookModel[]>("https://localhost:7018/api/Books/GetAllBooks")
      .subscribe({
        next: (res: any) => {
          this.books = res;
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
    });
  }
}
