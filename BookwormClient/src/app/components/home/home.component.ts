import { Component } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrCurrencyPipe } from 'tr-currency';
import { AuthorModel } from 'src/app/models/author.model';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [RouterLink, SweetAlert2Module, TranslateModule, CommonModule, TrCurrencyPipe]
})
export default class HomeComponent {

    englishBooks: BookModel[] = [];
    newArrivalBooks: BookModel[] = [];
    featuredBooks: BookModel[] = [];
    scienceFictionBooks: BookModel[] = [];
    authors: AuthorModel[] = [];
    language: string = "";

    constructor(
        private http: HttpClient,
        private error: ErrorService,
        public translate: TranslateService,
        public shopping: ShoppingCartService,
        private spinner: NgxSpinnerService,
        public selectedLang: SelectedLanguageService
        ) {
        this.getEnglishBooks();
        this.getNewBooks();
        this.getFeaturedBooks();
        this.getScienceFictionBooks();
        this.getAuthors();

        if(localStorage.getItem("language")){
            this.language = (localStorage.getItem("language")) as string;
        }

        localStorage.removeItem("paymentDetails");
        localStorage.removeItem("shippingAndCartTotal");
        localStorage.removeItem("shippingPrice");
        localStorage.removeItem("currency");
        // Buradan devam edilecek.
        // localStorage.removeItem("bookPrices");
    }

    getNewBooks() {
        // this.spinner.show();
        setTimeout(() => {
            this.http.get<BookModel[]>("https://localhost:7018/api/Home/GetNewArrivalBooks")
            .subscribe({
                next: (res: any) => {
                    this.newArrivalBooks = res;
                    // this.spinner.hide();
                },
                error: (err: HttpErrorResponse) => {
                    this.error.errorHandler(err);
                }
            });
        }, 1000); 
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

    getEnglishBooks() {
        this.http.get("https://localhost:7018/api/Home/GetEnglishBooks").subscribe({
            next: (res: any) => {
                this.englishBooks = res;
            },
            error: (err: HttpErrorResponse) => {
                this.error.errorHandler(err);
            }
        })
    }

    getAuthors() {
        this.http.get("https://localhost:7018/api/Authors/GetAuthors").subscribe({
            next: (res: any) => {
                this.authors = res;
            },
            error: (err: HttpErrorResponse) => {
                this.error.errorHandler(err);
            }
        })
    }

    getScienceFictionBooks(){
        this.http.get("https://localhost:7018/api/Home/GetScienceFictionBooks").subscribe({
          next: (res: any) => {
            this.scienceFictionBooks = res;
          },
          error: (err: HttpErrorResponse) => {
            this.error.errorHandler(err);
          }
        })
      }
}
