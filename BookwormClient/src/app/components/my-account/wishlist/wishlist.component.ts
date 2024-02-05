import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from 'src/app/services/wish-list.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [TranslateModule, CommonModule, TrCurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  
  constructor(
    public wishlist: WishListService
  ){

  }

}
