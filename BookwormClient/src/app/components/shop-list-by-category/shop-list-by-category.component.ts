import { Component } from '@angular/core';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'app-shop-list-by-category',
    templateUrl: './shop-list-by-category.component.html',
    styleUrls: ['./shop-list-by-category.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, RouterLink, NgClass, TranslateModule]
})
export class ShopListByCategoryComponent {

  constructor(
    public shopListBooks: ShopListBooksService,
    public selectLang: SelectedLanguageService,
    public shopping: ShoppingCartService
  ){}
}
