import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  loginRequest: LoginModel = new LoginModel();
  registerRequest: RegisterModel = new RegisterModel();
  errorMessage: string = "";
  isUserNameOrEmailError: boolean = false;
  isPasswordError: boolean = false;
  isFirstNameError: boolean = false;
  isLastNameError: boolean = false;
  isUserNameError: boolean = false;
  isEmailError: boolean = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private error: ErrorService,
  ) { }

  ngOnInit(): void {
    this.signIn();
  }

  signIn() {
    this.http.post("https://localhost:7018/api/Auth/Login", this.loginRequest).subscribe({
      next: (res: any) => {
        localStorage.setItem("response", JSON.stringify(res));
        this.auth.checkAuthentication();
        location.href = "/";
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }

  signUp() {
    this.http.post("https://localhost:7018/api/Auth/Register", this.registerRequest).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl("/");
        console.log("Kayıt işlemi başarıyla tamamlandı.")
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }

  checkFirstName() {
    if (this.registerRequest.firstName.length < 3) {
      this.isFirstNameError = true;
      this.errorMessage = '* Geçerli bir ad girin!'
      return;
    } else {
      this.isFirstNameError = false;
    }
  }

  checkLastName() {
    if (this.registerRequest.lastName.length < 3) {
      this.isLastNameError = true;
      this.errorMessage = '* Geçerli bir soyad girin!'
      return;
    } else {
      this.isLastNameError = false;
    }
  }

  checkUserName() {
    if (this.registerRequest.userName.length < 3) {
      this.isUserNameError = true;
      this.errorMessage = '* Geçerli bir kullanıcı adı girin!'
      return;
    } else {
      this.isUserNameError = false;
    }
  }

  checkEmail() {
    if (this.registerRequest.email.length < 3) {
      this.isEmailError = true;
      this.errorMessage = '* Geçerli bir e-posta girin!'
      return;
    } else {
      this.isEmailError = false;
    }
  }

  checkUserNameOrEmail() {
    if (this.loginRequest.userNameOrEmail.length < 3) {
      this.isUserNameOrEmailError = true;
      this.errorMessage = '* Geçerli bir kullanıcı adı ya da e-posta girin!'
      return;
    } else {
      this.isUserNameOrEmailError = false;
    }
  }

  checkSignInPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.loginRequest.password.length < 6) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir özel karakter içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }
  }

  checkSignUpPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.loginRequest.password.length < 6) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir özel karakter içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }
  }

  checkSignUpConfPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.loginRequest.password.length < 6) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.loginRequest.password)) {
      this.isPasswordError = true;
      this.errorMessage = '* Şifreniz en az bir özel karakter içermelidir.'
      return;
    } else {
      this.isPasswordError = false;
    }
  }
}