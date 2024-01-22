import { ErrorHandler, Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { PaymentModel } from '../models/payment.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  paymentRequest: PaymentModel = new PaymentModel();
  shoppingCarts: any[] = [];
  prices: { value: number, currency: string }[] = [];
  selectedCurrency: string = '';
  count: number = 0;
  total: number = 0;
  flatRateTl: number = 24.99;
  flatRateUsd: number = 4.99;
  cartTotal: number = 0;
  payBtnDisabled: boolean = false;


  constructor(
    private translate: TranslateService,
    private swal: SwalService,
    private http: HttpClient,
    private error: ErrorService,
    private router: Router
  ) {
    if (localStorage.getItem('shoppingCarts')) {
      const carts: string | null = localStorage.getItem('shoppingCarts')
      if (carts !== null) {
        this.shoppingCarts = JSON.parse(carts)
        this.count = this.shoppingCarts.length;
      }
    }

    this.shippingAndCartTotal();
    // this.shippingControl();
    // this.onCurrencyButtonClick('this.selectedCurrency');
    // this.calcTotal();
  }

  calcTotal() {
    this.total = 0;

    const sumMap = new Map<string, number>();

    for (const s of this.shoppingCarts) {
      const price = { ...s.price };
      const exchangeRate = this.getExchangeRate(price.currency);

      if (price.currency !== this.selectedCurrency) {
        // Sepetteki ürünün para birimi, seçilen para birimiyle aynı değilse dönüşüm yap
        if (this.selectedCurrency === '₺') {
          // $'yi ₺'ye çevir
          price.value *= exchangeRate;
          price.currency = this.selectedCurrency;
        } else if (this.selectedCurrency === '$') {
          // ₺'yi $'ye çevir
          price.value /= exchangeRate;
          price.currency = this.selectedCurrency;
        }
      }

      const currentSum = sumMap.get(price.currency) || 0;
      sumMap.set(price.currency, currentSum + price.value);
    }

    this.prices = Array.from(sumMap, ([currency, value]) => ({ currency, value }));
  }


  removeByIndex(index: number) {
    forkJoin({
      delete: this.translate.get("remove.doYouWantToDeleted"),
      cancel: this.translate.get("remove.cancelButton"),
      confirm: this.translate.get("remove.confirmButton")
    }).subscribe(res => {
      this.swal.callSwal(res.delete, res.cancel, res.confirm, () => {

        this.shoppingCarts.splice(index, 1)
        localStorage.setItem("shoppingCarts", JSON.stringify(this.shoppingCarts));
        this.count = this.shoppingCarts.length;
        // localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal));
        this.calcTotal();
        this.shippingControl();
        localStorage.setItem("bookPrices", JSON.stringify(this.prices));

        // this.onCurrencyButtonClick(this.selectedCurrency)
      });
    })
  }

  addShoppingCart(book: BookModel) {
    this.shoppingCarts.push(book);
    localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
    this.count++;
    this.translate.get("bookAddedtoCart").subscribe(
      res => {
        this.swal.callToast(res, 'success');
      }
    )
    this.calcTotal();
    localStorage.setItem("bookPrices", JSON.stringify(this.prices));
  }

  onCurrencyButtonClick(currency: string) {
    this.selectedCurrency = currency;
    localStorage.setItem("currency", currency);
    this.calcTotal();
    localStorage.setItem("bookPrices", JSON.stringify(this.prices));
    this.shippingControl();
  }

  shippingControl() {
    const isFreeShipping: boolean = (this.getTotal() > 249 && this.selectedCurrency === '₺') || (this.getTotal() > 19 && this.selectedCurrency === '$');

    if (!isFreeShipping) {
      this.updateTotal('flatRate');
    }
  }

  updateTotal(shippingMethod: string): void {
    switch (shippingMethod) {
      case 'flatRate':
        this.total = this.selectedCurrency === '₺' ? this.flatRateTl : this.flatRateUsd;
        console.log(this.selectedCurrency)
        // localStorage.setItem("shippingPrice", this.selectedCurrency === '$' ? JSON.stringify(this.flatRateUsd) : JSON.stringify(this.flatRateTl));
        break;
      default:
        break;
    }
  }

  getTotal(): number {
    return this.prices.reduce((total, price) => total + price.value, 0);
  }

  shippingAndCartTotal(): number {
    this.cartTotal = this.prices.reduce((total, price) => total + price.value, 0) + this.total;
    localStorage.setItem('shippingAndCartTotal', JSON.stringify(this.cartTotal));
    return this.cartTotal;

  }

  payment(data: PaymentModel, callBack: (res: any) => void) {
    this.http.post(`https://localhost:7018/api/Carts/Payment`, data).subscribe({
      next: (res: any) => {
        callBack(res);
        this.translate.get("paymentSuccessful").subscribe(
          res => {
            this.swal.callToast(res, 'success');
          }
        )
        setTimeout(() => {
          this.router.navigate(['/order-received']);
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }


  getExchangeRate(selectedCurrency: string): number {
    if (selectedCurrency === '₺') {
      return 30.0;
    } else if (selectedCurrency === '$') {
      return 30.0;
    } else {
      return 1.0;
    }
  }

}
