import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
    selector: 'app-cart-sidebar',
    templateUrl: './cart-sidebar.component.html',
    styleUrls: ['./cart-sidebar.component.css'],
    standalone: true,
    imports: [TranslateModule, CommonModule, TrCurrencyPipe]
})
export class CartSidebarComponent {
  
  @ViewChild("cartSidebarCloseBtn") closeBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private router: Router,
    public shopping: ShoppingCartService
  ){
    this.shopping.calcTotal();
    // shopping.onCurrencyButtonClick(shopping.selectedCurrency);
    // this.shopping.getTotal();
    // console.log(this.shopping.getTotal());
  }

  gotoCart(){
    if(this.closeBtn != undefined){
      this.closeBtn.nativeElement.click();
    }
    this.router.navigateByUrl("/cart")
  }

  gotoCheckout(){
    if(this.closeBtn != undefined){
      this.closeBtn.nativeElement.click();
    }
    this.router.navigateByUrl("/checkout")
  }
}
