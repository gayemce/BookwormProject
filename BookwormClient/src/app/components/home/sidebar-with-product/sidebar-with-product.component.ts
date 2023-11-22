import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-sidebar-with-product',
  templateUrl: './sidebar-with-product.component.html',
  styleUrls: ['./sidebar-with-product.component.css']
})
export class SidebarWithProductComponent {

  featuredBooks: BookModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService,
  ) {
    this.getFeaturedBooks();
  }

  getFeaturedBooks(){
    this.http.get("https://localhost:7018/api/Home/GetFeaturedBooks").subscribe({
      next: (res: any) => {
        this.featuredBooks = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }
}
