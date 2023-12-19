import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  request: LoginModel = new LoginModel();

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private error: ErrorService
  ) {}

  ngOnInit(): void {
    this.signIn();
  }

  signIn() {
    if (this.request.userNameOrEmail.length < 3) {
      console.log('Geçerli bir kullanıcı adı ya da email adresi girin.');
      return;
    };

    if (this.request.password.length < 6) {
      console.log('Şifreniz en az 6 karakter olmalıdır.');
      return;
    };

    this.http.post("https://localhost:7018/api/Auth/Login", this.request).subscribe({
      next: (res: any) => {
        localStorage.setItem("response", JSON.stringify(res));
        this.auth.checkAuthentication();
        console.log("response var!")
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }
}


