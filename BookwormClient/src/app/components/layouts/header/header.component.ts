import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookModel } from 'src/app/models/book.model';
import { CategoryModel } from 'src/app/models/category.model';
import { RequestModel } from 'src/app/models/request.model';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';
import { TranslateModule } from '@ngx-translate/core';

import { MiddlebarComponent } from './middlebar/middlebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [TopbarComponent, MiddlebarComponent, RouterLink, TranslateModule, CommonModule]
})
export class HeaderComponent {

  categories: CategoryModel[] = [];

  @ViewChild("browseCategoriesBtn") categoriesBtn: ElementRef<HTMLButtonElement> | undefined

  constructor(
    public router: Router,
    private http: HttpClient,
    private error: ErrorService,
    public selectLang: SelectedLanguageService,
    public shopListBooks: ShopListBooksService,
    // private cdr: ChangeDetectorRef  // ChangeDetectorRef'yi enjekte edin
  ){
    // this.closeCategories();
    this.getBrowseCategories();
  }

  // closeCategories(){
  //   console.log('Current URL:', this.router.url);
    
  //   if(this.router.url !== '/'){
  //     setTimeout(() => {
  //       console.log('Kategoriler kapatılıyor');
  //       if(this.categoriesBtn != undefined){
  //         this.categoriesBtn.nativeElement.click();
  //       }
  //        this.cdr.detectChanges();  // Manüel değişiklik algılamayı tetikle
  //     }, 3000);
  //   }
  // }
  
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
