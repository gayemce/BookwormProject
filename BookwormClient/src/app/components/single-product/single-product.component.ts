import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BookModel } from 'src/app/models/book.model';
import { ReviewModel } from 'src/app/models/review.model';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  standalone: true,
  imports: [TrCurrencyPipe, CurrencyPipe, TranslateModule, CommonModule],
  providers: [DatePipe]
})
export default class SingleProductComponent {

  book: BookModel = new BookModel();
  booksByAuthor: BookModel[] = [];
  reviews: ReviewModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private activated: ActivatedRoute,
    public selectLang: SelectedLanguageService,
  ) {

    this.activated.params.subscribe(res => {
      this.http.get<BookModel[]>('https://localhost:7018/api/Books/GetBookDetailById/' + res["value"]).subscribe({
        next: (res: any) => {
          this.book = res;
          console.log(this.book)
          this.getBooksbyAuthor();
          this.getAllReview();
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      });
    })
  }

  getBooksbyAuthor() {
    this.http.get(`https://localhost:7018/api/Books/GetBooksbyAuthor/${this.book.author.id}/${this.book.id}`).subscribe({
      next: (res: any) => {
        this.booksByAuthor = res;
        console.log(this.booksByAuthor)
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  getAllReview(){
    this.http.get("https://localhost:7018/api/Reviews/GetAllReviews/" + this.book.id).subscribe({
      next: (res: any) => {
        this.reviews = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }
}