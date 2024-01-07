import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';
import { SelectedLanguageService } from './selected-language.service';

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
  localPickupTl: number = 12.99;
  flatRateUsd: number = 9.99;
  localPickupUsd: number = 4.99;

  constructor(
    private translate: TranslateService,
    private swal: SwalService,
    private selectLang: SelectedLanguageService
  ) {
    if (localStorage.getItem('shoppingCarts')) {
      const carts: string | null = localStorage.getItem('shoppingCarts')
      if (carts !== null) {
        this.shoppingCarts = JSON.parse(carts)
        this.count = this.shoppingCarts.length;
      }
    }

    this.onCurrencyButtonClick(this.selectedCurrency);
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
      console.log(this.prices);
    }
  }

  removeByIndex(index: number){
    this.shoppingCarts.splice(index,1)
    localStorage.setItem("shoppingCarts", JSON.stringify(this.shoppingCarts));
    this.count = this.shoppingCarts.length;
    this.calcTotal();
    this.onCurrencyButtonClick(this.selectedCurrency)
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
  }

  updateTotal(shippingMethod: string): void {
    switch (shippingMethod) {
      case 'flatRate':
        this.total = 0;
        this.total += this.selectedCurrency === '₺' ? this.flatRateTl : this.flatRateUsd;
        console.log(this.total);
        break;
      case 'localPickup':
        this.total = 0;
        this.total += this.selectedCurrency === '₺' ? this.localPickupTl : this.localPickupUsd;
        console.log(this.total);
        break;
      default:
        break;
    }
  }

  getTotal(): number {
    // Sepetin toplam tutarını hesapla ve döndür
    return this.prices.reduce((total, price) => total + price.value, 0) + this.total;
  }

  ForeignCurrencyAccount() {
    // Seçilen para birimine göre döviz kuru al ve işlemleri gerçekleştir
    const exchangeRate = this.getExchangeRate(this.selectedCurrency);

    this.prices.forEach(price => {
      if (price && price.value && price.currency) {
        if (this.selectedCurrency === '$' && price.currency === '₺' ) {
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
      return 30.0; // Örnek bir döviz kuru
    } else {
      return 1.0;
    }
  }

}
