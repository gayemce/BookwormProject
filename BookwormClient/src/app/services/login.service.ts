import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { AuthService } from './auth.service';
import { LoginModel } from '../models/login.model';
import { TokenModel } from '../models/token.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  request: LoginModel = new LoginModel();
  token: TokenModel = new TokenModel();
  tokenString: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private error: ErrorService
  ) { }

  signIn() {
    if (this.request.userNameOrEmail.length < 3) {
      console.log('Geçerli bir kullanıcı adı ya da email adresi girin.');
      return;
    }

    if (this.request.password.length < 6) {
      console.log('Şifreniz en az 6 karakter olmalıdır.');
      return;
    }

    this.http.post("https://localhost:7018/api/Auth/Login", this.request).subscribe({
      next: (res: any) => {
        localStorage.setItem("response", JSON.stringify(res));
        const closeBtn = document.getElementById("cartSidebarCloseBtn");
        closeBtn?.click();
        this.router.navigateByUrl("/");
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })

    if (localStorage.getItem("response")) {
      const responseString = localStorage.getItem("response");
      if (!responseString) {
        return this.redirectToLogin()
      }

      const responseJson = JSON.parse(responseString);
      this.tokenString = responseJson?.accessToken;
      if (!this.tokenString) {
        return this.redirectToLogin()
      }

      const decode: any = jwtDecode(this.tokenString);
      this.token.email = decode?.Email;
      this.token.name = decode?.Name;
      this.token.userName = decode?.userName;
      this.token.userId = decode?.userId;
      this.token.exp = decode?.exp;

      const now = new Date().getTime() / 1000;
      if (this.token.exp < now) {
        return this.redirectToLogin();
      }

    }

    else {
      this.redirectToLogin();
    }

    return true;
  }

  redirectToLogin() {
    this.router.navigateByUrl("/login");
    return false;
  }

}
