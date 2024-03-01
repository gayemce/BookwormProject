import { Component } from '@angular/core';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass, CurrencyPipe } from '@angular/common';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrCurrencyPipe } from 'tr-currency';
import { WishListComponent } from '../wish-list/wish-list.component';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
    selector: 'app-shop-list-by-category',
    templateUrl: './shop-list-by-category.component.html',
    styleUrls: ['./shop-list-by-category.component.css'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, RouterLink, NgClass, TranslateModule, TrCurrencyPipe, CurrencyPipe]
})
export class ShopListByCategoryComponent {
  currentMonthEn: string = "";
  currentMonthTr: string = "";

  constructor(
    public shopListBooks: ShopListBooksService,
    public selectLang: SelectedLanguageService,
    public shopping: ShoppingCartService,
    public wishList: WishListService,
    public selectedLang: SelectedLanguageService
  ){
    const currentDate = new Date();
    const monthNamesEn = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const monthNamesTr = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    const currentMonthIndex = currentDate.getMonth();
    this.currentMonthEn = monthNamesEn[currentMonthIndex];
    this.currentMonthTr = monthNamesTr[currentMonthIndex];
  }
}
