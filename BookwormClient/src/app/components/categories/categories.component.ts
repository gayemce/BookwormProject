import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ErrorService } from 'src/app/services/error.service';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export default class CategoriesComponent {

  categories: CategoryModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService) {
    this.getAllCategories()
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
