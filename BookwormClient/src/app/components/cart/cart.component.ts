import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: true,
    imports: [FormsModule, TranslateModule, CommonModule, TrCurrencyPipe, RouterLink]
})
export default class CartComponent {

    language: string = "en";
    currency: string = "";

    constructor(
        public shopping: ShoppingCartService,
    ) {
        if (localStorage.getItem("language")) {
            this.language = localStorage.getItem("language") as string;
        }
        if (localStorage.getItem("currency")){
            this.currency = localStorage.getItem("currency") as string;
        }

        // this.shopping.calcTotal();
        this.shopping.onCurrencyButtonClick(this.currency);
        
    }
}
