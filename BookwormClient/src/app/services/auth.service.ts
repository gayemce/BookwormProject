import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // token: TokenModel = new TokenModel();
  // tokenString: string = "";

  // constructor(
  //   private router: Router
  // ) { }

  // checkAuthentication() {
  //   if (localStorage.getItem("response"))
  //   {
  //     const responseString = localStorage.getItem("response");
  //     if (!responseString) {
  //       return this.redirectToLogin()
  //     }

  //     const responseJson = JSON.parse(responseString);
  //     this.tokenString = responseJson?.accessToken;
  //     if (!this.tokenString) {
  //       return this.redirectToLogin()
  //     }

  //     const decode: any = jwtDecode(this.tokenString);
  //     this.token.email = decode?.Email;
  //     this.token.name = decode?.Name;
  //     this.token.userName = decode?.userName;
  //     this.token.userId = decode?.userId;
  //     this.token.exp = decode?.exp;

  //     const now = new Date().getTime() / 1000;
  //     if (this.token.exp < now) {
  //       return this.redirectToLogin();
  //     }

  //   }

  //   else{
  //     this.redirectToLogin();
  //   }

  //   return true;
  // }

  // redirectToLogin() {
  //   this.router.navigateByUrl("/login");
  //   return false;
  // }
}
