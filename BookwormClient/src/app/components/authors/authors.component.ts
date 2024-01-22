import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { CategoryModel } from 'src/app/models/category.model';
import { RequestModel } from 'src/app/models/request.model';
import { ErrorService } from 'src/app/services/error.service';


@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css'],
    standalone: true,
    imports: []
})
export default class AuthorsComponent {

  request: RequestModel = new RequestModel();
  authors: AuthorModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService,
  ) {
    this.getAllAuthors();
   }

  getAllAuthors() {
    this.request.authorId = null;
    this.request.pageSize = 10;
    this.request.search = "";

    this.http.post("https://localhost:7018/api/Authors/GetAllAuthors", this.request).subscribe({
      next: (res: any) => {
        this.authors = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }
}
