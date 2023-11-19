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
  
  newArrivalBooks: BookModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService) {
    this.getNewBooks();
  }

  //En son eklenen 6 kitabı getirir
  getNewBooks() {
    this.http.get<BookModel[]>("https://localhost:7018/api/Home/GetNewArrivalBooks")
      .subscribe({
        next: (res: any) => {
          this.newArrivalBooks = res;
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
    });
  }
}
