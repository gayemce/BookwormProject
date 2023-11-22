import { Component } from '@angular/core';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';

@Component({
  selector: 'app-shop-list-by-category',
  templateUrl: './shop-list-by-category.component.html',
  styleUrls: ['./shop-list-by-category.component.css']
})
export class ShopListByCategoryComponent {

  constructor(
    public shopListBooks: ShopListBooksService,
    public selectLang: SelectedLanguageService
  ){}
}
