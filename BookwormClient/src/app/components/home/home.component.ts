import { Component } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [RouterLink, SweetAlert2Module, TranslateModule]
})
export default class HomeComponent {

    newArrivalBooks: BookModel[] = [];
    featuredBooks: BookModel[] = [];
    scienceFictionBooks: BookModel[] = [];

    constructor(
        private http: HttpClient,
        private error: ErrorService,
        public translate: TranslateService,
        public shopping: ShoppingCartService,
        ) {
        this.getNewBooks();
        this.getFeaturedBooks();
        this.getScienceFictionBooks();
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
