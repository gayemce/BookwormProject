import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookCoverTypeEnumEn } from 'src/app/models/book-cover-type-en.enum';
import { BookCoverTypeEnumTr } from 'src/app/models/book-cover-type-tr.enum';
import { BookModel } from 'src/app/models/book.model';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export default class SingleProductComponent {

  book: BookModel = new BookModel();

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
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      });
    })
  }


  getCoverTypeEn(value: BookCoverTypeEnumEn): any {
    console.log(value);
    if (value === 0) {
      return "Hardcover"
    }
    else if (value === 1) {
      return "Paperback"
    }
  }

  getCoverTypeTr(value: BookCoverTypeEnumTr): any {
    console.log(value);
    if (value === 0) {
      return "Ciltli"
    }
    else if (value === 1) {
      return "Ciltsiz"
    }
  }
}
