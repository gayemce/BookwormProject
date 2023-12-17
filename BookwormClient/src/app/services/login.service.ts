import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private error: ErrorService
  ){
  }

  signIn(form: NgForm){
    if(form.valid){
      this.http.post("https://localhost:7018/api/Auth/Login", {
        usernameOrEmail: form.controls["userNameOrEmail"].value,
        password: form.controls["password"].value
      })
      .subscribe({
        next: (res:any) => {
          //token işlenecek
          localStorage.setItem("response", JSON.stringify(res));
          this.auth.isAuthentication();
          this.router.navigateByUrl("/");
        },
        error: (err: HttpErrorResponse) => {
          this.error.errorHandler(err);
        }
      })
    }
  }
}
