import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: TokenModel = new TokenModel();
  tokenString: string = "";

  constructor(private router: Router) { }

  checkAuthentication() {
    const responseString = localStorage.getItem("response");
    if (responseString) {
      const responseJson = JSON.parse(responseString);
      this.tokenString = responseJson?.accessToken;
      const decode: any = jwtDecode(this.tokenString);
      this.token.email = decode?.Email;
      this.token.name = decode?.Name;
      this.token.userName = decode?.UserName;
      this.token.userId = decode?.UserId;
      this.token.exp = decode?.exp;
      this.token.roles = decode?.Roles;

      // console.log(this.token);

      const now = new Date().getTime() / 1000;
      if (this.token.exp < now) {
        return false;
      }
      return true;
    }
    
    else {
      this.router.navigateByUrl("/");
      return true;
    }
  }
}
