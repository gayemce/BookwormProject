import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { ErrorService } from 'src/app/services/error.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-science-fiction-books',
    templateUrl: './science-fiction-books.component.html',
    styleUrls: ['./science-fiction-books.component.css'],
    standalone: true,
    imports: [TranslateModule]
})
export class ScienceFictionBooksComponent {

  scienceFictionBooks: BookModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ){
    this.getScienceFictionBooks();
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
