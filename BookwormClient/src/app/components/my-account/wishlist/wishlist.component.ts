import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { WishListService } from 'src/app/services/wish-list.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [TranslateModule, CommonModule, TrCurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  
  constructor(
    public wishlist: WishListService,
    private shopping: ShoppingCartService
  ){

  }

  logout(){
    localStorage.removeItem("response");
    this.shopping.getAllShoppingCarts();
    location.href = "/"
  }
}
