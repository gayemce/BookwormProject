import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent {
  
  @ViewChild("cartSidebarCloseBtn") closeBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private router: Router
  ){}

  gotoCart(){
    if(this.closeBtn != undefined){
      this.closeBtn.nativeElement.click();
    }
    //const cartSidebarCloseBtn = document.getElementById("cartSidebarCloseBtn");
    //cartSidebarCloseBtn?.click();
    this.router.navigateByUrl("/cart")
  }

  gotoCheckout(){
    if(this.closeBtn != undefined){
      this.closeBtn.nativeElement.click();
    }
    this.router.navigateByUrl("/checkout")
  }
}
