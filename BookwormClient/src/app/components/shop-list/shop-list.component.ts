import { Component } from '@angular/core';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  standalone: true,
  imports: [FormsModule, NgClass, TranslateModule, TrCurrencyPipe, CurrencyPipe]
})
export class ShopListComponent {
  currentMonthEn: string = "";
  currentMonthTr: string = "";

  constructor(
    public shopListBooks: ShopListBooksService,
    public selectedLang: SelectedLanguageService
  ) {

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
