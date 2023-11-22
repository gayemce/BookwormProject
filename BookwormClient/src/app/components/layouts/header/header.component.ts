import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book.model';
import { CategoryModel } from 'src/app/models/category.model';
import { RequestModel } from 'src/app/models/request.model';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  categories: CategoryModel[] = [];

  @ViewChild("browseCategoriesBtn") categoriesBtn: ElementRef<HTMLButtonElement> | undefined

  constructor(
    private router: Router,
    private http: HttpClient,
    private error: ErrorService,
    public selectLang: SelectedLanguageService,
    public shopListBooks: ShopListBooksService
  ){
    this.closeCategories();
    this.getBrowseCategories();
  }

  closeCategories(){
    setTimeout(() => {
      if(this.categoriesBtn != undefined){
        this.categoriesBtn.nativeElement.click();
      }
    }, 1000);
  }
  
  getBrowseCategories(){
    this.http.get("https://localhost:7018/api/Categories/GetAllCategories").subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

}
