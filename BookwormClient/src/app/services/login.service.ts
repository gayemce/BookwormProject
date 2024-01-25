import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectedLanguageService } from './selected-language.service';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from './swal.service';
import { SetShoppingCartsModel } from '../models/set-shopping-carts.model';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  request: LoginModel = new LoginModel();

  errorUserNameOrEmailMessageEn: string = "";
  errorUserNameOrEmailMessageTr: string = "";
  errorSignInPasswordMessageEn: string = "";
  errorSignInPasswordMessageTr: string = "";

  isUserNameOrEmailError: boolean = false;
  isSigninPasswordError: boolean = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private error: ErrorService,
    private translate: TranslateService,
    private swal: SwalService,
    private shopping: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    this.signIn();
  }

  signIn() {
    //buradan devam edilecek
    this.http.post("https://localhost:7018/api/Auth/Login", this.request).subscribe({
      next: (res: any) => {

        localStorage.setItem("response", JSON.stringify(res));
        this.auth.checkAuthentication();
        location.href = "/";

        const request: SetShoppingCartsModel[] = [];

        if (this.shopping.shoppingCarts.length > 0) {
          for (let s of this.shopping.shoppingCarts) {
            const cart = new SetShoppingCartsModel();
            cart.bookId = s.id,
              cart.appUserId = Number(this.auth.token.userId),
              cart.quantity = 1,
              cart.price = s.price

            request.push(cart);
          }

          this.http.post("https://localhost:7018/api/Carts/SetShoppingCartsFromLocalStorage", request).subscribe({
            next: (res: any) => {
              localStorage.removeItem("shoppingCarts");
              // localStorage.removeItem("bookPrices");
              this.shopping.checkLocalStorageForshoppingCarts();
              // location.href = "/"
            },
            error: (err: HttpErrorResponse) => {
              this.error.errorHandler(err)
            }
          })
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }

  checkUserNameOrEmail() {
    if (this.request.userNameOrEmail.length < 3) {
      this.isUserNameOrEmailError = true;
      this.errorUserNameOrEmailMessageEn = '* Enter a valid username or email!'
      this.errorUserNameOrEmailMessageTr = '* Geçerli bir kullanıcı adı ya da e-posta girin!'
    } else {
      this.isUserNameOrEmailError = false;
    }
  }


  checkSignInPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.request.password.length < 6) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must be at least 6 characters.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az 6 karakter olmalıdır.'
    }
    else {
      this.isSigninPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.request.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one capital letter.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir büyük harf içermelidir.'
    } else {
      this.isSigninPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.request.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one lowercase letter.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir küçük harf içermelidir.'
    } else {
      this.isSigninPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.request.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one digit.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir rakam içermelidir.'
    } else {
      this.isSigninPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.request.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one special character.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir özel karakter içermelidir.'
    } else {
      this.isSigninPasswordError = false;
    }
  }

}