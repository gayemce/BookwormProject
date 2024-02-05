import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: TokenModel = new TokenModel();
  tokenString: string = "";
  user: UserModel = new UserModel();

  firstName: string = "";
  lastName: string = ""; 
  userName: string = "";
  email: string = "";

  constructor(private router: Router,
    private http: HttpClient,
    private error: ErrorService) { }

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

  getUser(){
    this.http.get("https://localhost:7018/api/Auth/GetUser/" + this.token.userId).subscribe({
      next: (res: any) => {
        this.user = res;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.userName = this.user.userName;
        this.email = this.user.email;
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }
}