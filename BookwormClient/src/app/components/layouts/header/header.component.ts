import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ErrorService } from 'src/app/services/error.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  categories: CategoryModel[] = [];
  userSelectedLanguage : string | null = "";

  @ViewChild("browseCategoriesBtn") categoriesBtn: ElementRef<HTMLButtonElement> | undefined

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ){
    this.closeCategories();
    this.getBrowseCategories();
    this.selectedLanguage();
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

  selectedLanguage(){
    if(localStorage.getItem("language")){
      this.userSelectedLanguage = localStorage.getItem("language");
    }
  }

}
