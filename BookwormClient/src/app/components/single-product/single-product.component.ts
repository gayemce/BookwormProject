import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BookModel } from 'src/app/models/book.model';
import { CreateReviewModel } from 'src/app/models/create-review.model';
import { ReviewModel } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { SwalService } from 'src/app/services/swal.service';
import { TrCurrencyPipe } from 'tr-currency';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  standalone: true,
  imports: [TrCurrencyPipe, CurrencyPipe, TranslateModule, CommonModule, FormsModule],
  providers: [DatePipe]
})
export default class SingleProductComponent {


  book: BookModel = new BookModel();
  booksByAuthor: BookModel[] = [];
  reviews: ReviewModel[] = [];
  requestCreateReview: CreateReviewModel = new CreateReviewModel();
  comment: string = "";
  title: string = "";
  isResponse: boolean | undefined = undefined;
  allowToComment: boolean = false;
  starRating: number = 0;

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private activated: ActivatedRoute,
    public selectLang: SelectedLanguageService,
    private auth: AuthService,
    private swal: SwalService,
    private translate: TranslateService
  ) {
    if (localStorage.getItem('response')) {
      this.isResponse = true;
    }

    this.activated.params.subscribe(res => {
      this.http.get<BookModel[]>('https://localhost:7018/api/Books/GetBookDetailById/' + res["value"]).subscribe({
        next: (res: any) => {
          this.book = res;
          console.log(this.book)
          this.getBooksbyAuthor();
          this.getAllReview();
          this.AllowToComment();
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

  setRating(rating: number) {
    this.starRating = rating;
  }

  createReview() {
    this.requestCreateReview.appUserId = Number(this.auth.token.userId);
    this.requestCreateReview.bookId = this.book.id;
    this.requestCreateReview.raiting = this.starRating;
    this.requestCreateReview.title = this.title;
    this.requestCreateReview.comment = this.comment;
    this.http.post("https://localhost:7018/api/Reviews/Create", this.requestCreateReview).subscribe({
      next: (res: any) => {
        this.reviews = res;
        console.log(res);
        this.getAllReview();
        this.clearReviews();
        this.translate.get("commentSuccessfullySaved").subscribe(
          res => {
            this.swal.callToast(res, 'success');
          });
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  AllowToComment() {
    this.http.get(`https://localhost:7018/api/Reviews/AllowToComment/${this.book.id}/${this.auth.token.userId}`).subscribe({
      next: (res: any) => {
        this.allowToComment = res;
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  getAllReview() {
    this.http.get("https://localhost:7018/api/Reviews/GetAllReviews/" + this.book.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.reviews = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  clearReviews() {
    this.title = "";
    this.comment = "";
    this.starRating = 0;
  }
}