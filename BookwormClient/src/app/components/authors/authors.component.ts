import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {

  categories: CategoryModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService,
  ) {
    this.getAllCategories();
   }

  getAllCategories() {
    this.http.get("https://localhost:7018/api/Categories/GetAllCategories").subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }
}
