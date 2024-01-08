import { ErrorHandler, Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCarts: any[] = [];
  prices: { value: number, currency: string }[] = [];
  selectedCurrency: string = '';
  count: number = 0;
  total: number = 0;
  flatRateTl: number = 24.99;
  flatRateUsd: number = 4.99;

  constructor(
    private translate: TranslateService,
    private swal: SwalService,
    private http: HttpClient,
    private error: ErrorService
  ) {
    if (localStorage.getItem('shoppingCarts')) {
      const carts: string | null = localStorage.getItem('shoppingCarts')
      if (carts !== null) {
        this.shoppingCarts = JSON.parse(carts)
        this.count = this.shoppingCarts.length;
      }
    }

    // this.onCurrencyButtonClick(this.selectedCurrency);
    this.calcTotal();
  }

  calcTotal() {
    this.total = 0;

    const sumMap = new Map<string, number>();

    this.prices = [];
    for (let s of this.shoppingCarts) {
      this.prices.push({ ...s.price });
    }

    for (const item of this.prices) {
      const currentSum = sumMap.get(item.currency) || 0;
      sumMap.set(item.currency, currentSum + item.value);
    }

    this.prices = [];
    for (const [currency, sum] of sumMap) {
      this.prices.push({ value: sum, currency: currency });
      // console.log(this.prices);
    }
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
        this.calcTotal();
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
  }

  onCurrencyButtonClick(currency: string) {
    this.selectedCurrency = currency;
    this.ForeignCurrencyAccount();

    const isFreeShipping: boolean = (this.getTotal() > 249 && this.selectedCurrency === '₺') || (this.getTotal() > 19 && this.selectedCurrency === '$');

    if (!isFreeShipping) {
      this.updateTotal('flatRate');
    }
  }

  updateTotal(shippingMethod: string): void {
    switch (shippingMethod) {
      case 'flatRate':
        this.total = this.selectedCurrency === '₺' ? this.flatRateTl : this.flatRateUsd;
        console.log(this.total);
        break;
      default:
        break;
    }
  }

  getTotal(): number {
    return this.prices.reduce((total, price) => total + price.value, 0);
  }

  shippingAndCartTotal(): number {
    // Kargo ile sepetin toplam tutarı
    return this.prices.reduce((total, price) => total + price.value, 0) + this.total;
  }

  payment(){
    this.http.post(`https://localhost:7018/api/Carts/Payment`, {books: this.shoppingCarts}).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      });
  }

  ForeignCurrencyAccount() {
    // Seçilen para birimine göre döviz kuru al ve işlemleri gerçekleştir
    const exchangeRate = this.getExchangeRate(this.selectedCurrency);

    this.prices.forEach(price => {
      if (price && price.value && price.currency) {
        if (this.selectedCurrency === '$' && price.currency === '₺') {
          // ₺'yi $'ye çevir
          price.value /= exchangeRate;
          price.currency = this.selectedCurrency;
        } else if (this.selectedCurrency === '₺' && price.currency === '$') {
          // $'yi ₺'ye çevir
          price.value *= exchangeRate;
          price.currency = this.selectedCurrency;
        }
      } else {
        console.error("Invalid price object:", price);
      }
    });
  }

  getExchangeRate(selectedCurrency: string): number {
    // Seçilen para birimine göre döviz kuru algoritmasını uygula
    if (selectedCurrency === '₺') {
      return 30.0;
    } else if (selectedCurrency === '$') {
      return 30.0;
    } else {
      return 1.0;
    }
  }

}
