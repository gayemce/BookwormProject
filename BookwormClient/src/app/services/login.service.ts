import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { LoginModel } from '../models/login.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  request: LoginModel = new LoginModel();

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private error: ErrorService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.signIn();
  }

  signIn() {
    this.http.post("https://localhost:7018/api/Auth/Login", this.request).subscribe({
      next: (res: any) => {
        localStorage.setItem("response", JSON.stringify(res));
        this.auth.checkAuthentication();
        location.href = "/";
        console.log("response var!")
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }
}


