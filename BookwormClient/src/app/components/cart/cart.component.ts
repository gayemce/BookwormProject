import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: true,
    imports: [FormsModule, TranslateModule, CommonModule, TrCurrencyPipe]
})
export default class CartComponent {

    language: string = "en";

    constructor(
        public shopping: ShoppingCartService,
        private translate: TranslateService
    ){
        if(localStorage.getItem("language")){
            this.language = localStorage.getItem("language") as string;
        }

        this.shopping.calcTotal();
    }
}
