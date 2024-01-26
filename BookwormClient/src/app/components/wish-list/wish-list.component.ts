import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { WishListService } from 'src/app/services/wish-list.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
  imports: [FormsModule, TranslateModule, CommonModule, TrCurrencyPipe, RouterLink]
})
export class WishListComponent {
  constructor(
    public wishList: WishListService) { }
    
}
