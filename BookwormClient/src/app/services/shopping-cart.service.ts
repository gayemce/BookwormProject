import { ElementRef, ErrorHandler, Injectable, ViewChild } from '@angular/core';
import { BookModel } from '../models/book.model';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from 'src/app/services/swal.service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { PaymentModel } from '../models/payment.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SetShoppingCartsModel } from '../models/set-shopping-carts.model';
import { AddShoppingCartModel } from '../models/add-shopping-cart.model';
import { AddToWishListModel } from '../models/add-to-wish-list.model';

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
    private router: Router,
    private auth: AuthService
  ) {
    this.checkLocalStorageForshoppingCarts();

    this.shippingAndCartTotal();



    // this.shippingControl();
    // this.onCurrencyButtonClick('this.selectedCurrency');
    // this.calcTotal();
  }

  checkLocalStorageForshoppingCarts() {
    if (localStorage.getItem('shoppingCarts')) {
      const carts: string | null = localStorage.getItem('shoppingCarts')
      if (carts !== null) {
        this.shoppingCarts = JSON.parse(carts);
        // this.count = this.shoppingCarts.length;
      }
    } else {
      this.shoppingCarts = [];
    }

    //Kullanıcı varsa
    if (localStorage.getItem('response')) {
      this.auth.checkAuthentication();
      this.http.get("https://localhost:7018/api/Carts/GetAll/" + this.auth.token.userId).subscribe({
        next: (res: any) => {
          this.shoppingCarts = res;
          this.calcTotal();
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      });
    }

    // this.calcTotal();
  }


  calcTotal() {
    this.total = 0;

    const sumMap = new Map<string, number>();

    for (const s of this.shoppingCarts) {
      const price = { ...s.price };
      const quantity = s.quantity;

      localStorage.setItem('quantity', JSON.stringify(quantity));

      const exchangeRate = this.getExchangeRate(price.currency);
      if (price.currency !== this.selectedCurrency) {
        // Sepetteki ürünün para birimi, seçilen para birimiyle aynı değilse dönüşüm yap
        if (this.selectedCurrency === '₺') {
          // $'yi ₺'ye çevir
          if (price.currency === '$') {
            price.value = ((price.value * exchangeRate) * quantity);
          }
        } else if (this.selectedCurrency === '$') {
          // ₺'yi $'ye çevir
          if (price.currency === '₺') {
            price.value = ((price.value /= exchangeRate) * quantity);
          }
        }
      } else {
        price.value *= quantity;
      }

      const currentSum = sumMap.get(price.currency) || 0;
      sumMap.set(price.currency, currentSum + price.value);
    }

    this.prices = Array.from(sumMap, ([currency, value]) => ({ currency, value }));
    localStorage.setItem('prices', JSON.stringify(this.prices));
  }

  removeByIndex(index: number) {
    forkJoin({
      delete: this.translate.get("remove.doYouWantToDeleted"),
      cancel: this.translate.get("remove.cancelButton"),
      confirm: this.translate.get("remove.confirmButton")
    }).subscribe(res => {
      this.swal.callSwal(res.delete, res.cancel, res.confirm, () => {

        if (localStorage.getItem("response")) {
          this.http.get("https://localhost:7018/api/Carts/RemoveById/" + this.shoppingCarts[index]?.cartId).subscribe({
            next: (res: any) => {
              this.checkLocalStorageForshoppingCarts();
            },
            error: (err: HttpErrorResponse) => {
              this.error.errorHandler(err);
            }
          });
        }

        else {
          this.shoppingCarts.splice(index, 1)
          localStorage.setItem("shoppingCarts", JSON.stringify(this.shoppingCarts));
          this.count = this.shoppingCarts.length;
          // localStorage.setItem('cartTotal', JSON.stringify(this.cartTotal));
          this.calcTotal();
          this.shippingControl();
          localStorage.setItem("bookPrices", JSON.stringify(this.prices));

          // this.onCurrencyButtonClick(this.selectedCurrency)
        }
      });
    })
  }

  addShoppingCart(book: BookModel) {
    if (localStorage.getItem("response")) {
      const data: AddShoppingCartModel = new AddShoppingCartModel();
      data.bookId = book.id;
      data.price = book.price;
      data.quantity = book.quantity;
      data.appUserId = Number(this.auth.token.userId);

      this.http.post("https://localhost:7018/api/Carts/AddShoppingCart", data).subscribe({
        next: (res: any) => {
          this.checkLocalStorageForshoppingCarts();
          this.calcTotal();
          localStorage.setItem("bookPrices", JSON.stringify(this.prices));

          this.translate.get("bookAddedtoCart").subscribe(
            res => {
              this.swal.callToast(res, 'success');
            });
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      })
    }
    else {
      console.log(book.quantity)
      if (book.quantity === 0) {
        this.translate.get("theBookIsOutOfStock").subscribe(res => {
          this.swal.callToast(res, 'error');
        });
      }
      else {
        const checkBookIsAlreadyExists = this.shoppingCarts.find(p => p.id == book.id);
        if (checkBookIsAlreadyExists !== undefined) {
          checkBookIsAlreadyExists.quantity += 1;
        } else {
          const newBook = { ...book };
          newBook.quantity = 1;
          this.shoppingCarts.push(newBook);
        }

        localStorage.setItem('shoppingCarts', JSON.stringify(this.shoppingCarts));
        this.calcTotal();
        localStorage.setItem("bookPrices", JSON.stringify(this.prices));
        book.quantity -= 1;
        this.translate.get("bookAddedtoCart").subscribe(
          res => {
            this.swal.callToast(res, 'success');
          });
      }
    }
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
