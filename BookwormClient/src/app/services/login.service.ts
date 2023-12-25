import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  request: LoginModel = new LoginModel();
  errorMessageUserNameOrEmail: string = "";
  errorMessagePassword: string = "";
  isUserNameOrEmailError: boolean = false;
  isPasswordError: boolean = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private error: ErrorService,
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


  checkUserNameOrEmail(){
    if (this.request.userNameOrEmail.length < 3) {
      this.isUserNameOrEmailError = true;
      this.errorMessageUserNameOrEmail = 'Geçerli bir kullanıcı adı ya da e-posta girin!'
      return;
    }else{
      this.isUserNameOrEmailError = false;
    }
  }

  checkPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if(this.request.password.length < 6){
      this.isPasswordError = true;
      this.errorMessagePassword = 'Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else{
      this.isPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.request.password)) {
      this.isPasswordError = true;
      this.errorMessagePassword = 'Şifreniz en az bir büyük harf içermelidir.'
      return;
    }else{
      this.isPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.request.password)) {
      this.isPasswordError = true;
      this.errorMessagePassword = 'Şifreniz en az bir küçük harf içermelidir.'
      return;
    }else{
      this.isPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.request.password)) {
      this.isPasswordError = true;
      this.errorMessagePassword = 'Şifreniz en az bir rakam içermelidir.'
      return;
    }else{
      this.isPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.request.password)) {
      this.isPasswordError = true;
      this.errorMessagePassword = 'Şifreniz en az bir özel karakter içermelidir.'
      return;
    }else{
      this.isPasswordError = false;
    }
  }
}