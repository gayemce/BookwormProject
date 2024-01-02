import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCarts: any[] = [];
  prices: {value: number, currency: string}[] = [];
  count: number = 0;
  total: number = 0;

  constructor(
    private translate: TranslateService,
    private swal: SwalService
  ) {
    if(localStorage.getItem('shoppingCarts')){
      const carts: string | null = localStorage.getItem('shoppingCarts') 
      if(carts !== null){
        this.shoppingCarts = JSON.parse(carts)
        this.count = this.shoppingCarts.length;
      }
    }
   }

   calcTotal(){
    this.total = 0;

    const sumMap = new Map<string, number>();

    this.prices = [];
    for(let s of this.shoppingCarts){
      this.prices.push({...s.price});
      // this.total += s.quantity * s.price.value;
    }

    for(const item of this.prices){
      const currentSum = sumMap.get(item.currency) || 0;
      sumMap.set(item.currency, currentSum + item.value);
    }

    this.prices = [];
    for(const [currency, sum] of sumMap){
      this.prices.push({value: sum, currency: currency});
      console.log(this.prices);
    }
   }

   addShoppingCart(book: BookModel){
    this.shoppingCarts.push(book);
    localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
    this.count++;
    this.translate.get("bookAddedtoCart").subscribe(
        res => {
            this.swal.callToast(res, 'success');
        }
    )
}
}
