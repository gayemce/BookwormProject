import { Component } from '@angular/core';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.css'],
    standalone: true,
    imports: [FormsModule, NgClass, TranslateModule]
})
export class ShopListComponent {

  constructor(
    public shopListBooks: ShopListBooksService,
    public selectLang: SelectedLanguageService
  ) {}
}
