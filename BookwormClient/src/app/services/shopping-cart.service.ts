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
  buttonClicked: boolean = false;

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
    // if(this.selectLang.userSelectedLanguage === 'tr'){
    //   this.onCurrencyButtonClick('₺');
    // }
    // else{
    //   this.onCurrencyButtonClick('$')
    // }
    
  }

  calcTotal() {
    this.total = 0;

    const sumMap = new Map<string, number>();

    this.prices = [];
    for (let s of this.shoppingCarts) {
      this.prices.push({ ...s.price });
      // this.total += s.quantity * s.price.value;
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

  addShoppingCart(book: BookModel) {
    this.shoppingCarts.push(book);
    localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
    this.count++;
    this.translate.get("bookAddedtoCart").subscribe(
      res => {
        this.swal.callToast(res, 'success');
      }
    )
  }


onCurrencyButtonClick(currency: string) {
  this.selectedCurrency = currency;
  this.ForeignCurrencyAccount();
  this.buttonClicked = true;
}

getTotal(): number {
  // Sepetin toplam tutarını hesapla ve döndür
  return this.prices.reduce((total, price) => total + price.value, 0);
}

ForeignCurrencyAccount() {
  // Seçilen para birimine göre döviz kuru al ve işlemleri gerçekleştir
  const exchangeRate = this.getExchangeRate(this.selectedCurrency);

  this.prices.forEach(price => {
    if (price && price.value && price.currency) {
      if (price.currency === '₺' && this.selectedCurrency === '$') {
        // ₺'yi $'ye çevir
        price.value /= exchangeRate;
        price.currency = this.selectedCurrency;
      } else if (price.currency === '$' && this.selectedCurrency === '₺') {
        // $'yi ₺'ye çevir
        price.value *= exchangeRate;
        price.currency = this.selectedCurrency;
      }
    } else {
      console.error("Invalid price object:", price);
    }
  });

  // this.getTotal();
}

getExchangeRate(selectedCurrency: string): number {
  // Seçilen para birimine göre döviz kuru algoritmasını uygula
  if (selectedCurrency === '₺') {
    return 30; // Örnek olarak 1 $ = 31.2 ₺
  } else if (selectedCurrency === '$') {
    // Diğer para birimleri
    return 30; // Örnek bir döviz kuru
  } else {
    return 1.0;
  }
}



}
