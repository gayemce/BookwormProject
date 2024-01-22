import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
    selector: 'app-middlebar',
    templateUrl: './middlebar.component.html',
    styleUrls: ['./middlebar.component.css'],
    standalone: true,
    imports: [RouterLink, FormsModule, TranslateModule, CommonModule, TrCurrencyPipe]
})
export class MiddlebarComponent {

  responseInLocalStorage: any;

  ngOnInit(){
    if(localStorage.getItem('response')){
      this.responseInLocalStorage = localStorage.getItem("response");
      this.auth.checkAuthentication();
    }
  }

  constructor(
    public shopListBooks: ShopListBooksService,
    public auth: AuthService,
    public shopping: ShoppingCartService
  ){ 
        this.shopping.calcTotal();
  }
}
