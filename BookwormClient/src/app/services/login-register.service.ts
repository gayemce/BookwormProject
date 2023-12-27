import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectedLanguageService } from './selected-language.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  loginRequest: LoginModel = new LoginModel();
  registerRequest: RegisterModel = new RegisterModel();
  errorUserNameOrEmailMessageEn: string = "";
  errorUserNameOrEmailMessageTr: string = "";
  errorSignInPasswordMessageEn: string = "";
  errorSignInPasswordMessageTr: string = "";
  errorFirstNameMessageEn: string = "";
  errorFirstNameMessageTr: string = "";
  errorLastNameMessageEn: string = "";
  errorLastNameMessageTr: string = "";
  errorUserNameMessageEn: string = "";
  errorUserNameMessageTr: string = "";
  errorEmailMessageEn: string = "";
  errorEmailMessageTr: string = "";
  errorSignUpPasswordMessageEn: string = "";
  errorSignUpPasswordMessageTr: string = "";
  errorSignUpConfPasswordMessageEn: string = "";
  errorSignUpConfPasswordMessageTr: string = "";
  isUserNameOrEmailError: boolean = false;
  isSigninPasswordError: boolean = false;
  isSignupPasswordError: boolean = false;
  isSignupConfPasswordError: boolean = false;
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
        console.log("Kayıt işlemi başarıyla tamamlandı.");
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }

  checkFirstName() {
    if (this.registerRequest.firstName.length < 3) {
      this.isFirstNameError = true;
      this.errorFirstNameMessageEn = '* Enter a valid name!'
      this.errorFirstNameMessageTr = '* Geçerli bir ad girin!'
      return;
    } else {
      this.isFirstNameError = false;
    }
  }

  checkLastName() {
    if (this.registerRequest.lastName.length < 3) {
      this.isLastNameError = true;
      this.errorLastNameMessageEn = '* Enter a valid surname!'
      this.errorLastNameMessageTr = '* Geçerli bir soyad girin!'
      return;
    } else {
      this.isLastNameError = false;
    }
  }

  checkUserName() {
    if (this.registerRequest.userName.length < 3) {
      this.isUserNameError = true;
      this.errorUserNameMessageEn = '* Enter a valid username!'
      this.errorUserNameMessageTr = '* Geçerli bir kullanıcı adı girin!'
      return;
    } else {
      this.isUserNameError = false;
    }
  }

  checkEmail() {
    if (!this.registerRequest.email) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Enter a valid email!";
      this.errorEmailMessageTr = "* Geçerli bir e-posta girin!";
    } else if (this.registerRequest.email.length < 3) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Enter a valid email!";
      this.errorEmailMessageTr = "* Geçerli bir e-posta girin!";
    } else if (!/^[^\s@]+@/.test(this.registerRequest.email)) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must contain an '@' sign!";
      this.errorEmailMessageTr = "* E-posta adresi '@' işareti içermelidir!";
    } else if (!/[a-zA-Z0-9]/.test(this.registerRequest.email.split('@')[1])) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must be continued after the '@' sign!"
      this.errorEmailMessageTr = "* E-posta adresi '@'  işaretinden sonra devam ettirilmelidir!";
    } else if (!/\./.test(this.registerRequest.email.split('@')[1])) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must contain a '.' sign!";
      this.errorEmailMessageTr = "* E-posta adresi '.' işareti içermelidir!";
    } else if (!/[a-zA-Z0-9]/.test(this.registerRequest.email.split('.')[1])) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must be continued after the '.' sign!";
      this.errorEmailMessageTr = "* E-posta adresi '.' işaretinden sonra devam ettirilmelidir!";
    } else {
      this.isEmailError = false;
    }
  }


  checkUserNameOrEmail() {
    if (this.loginRequest.userNameOrEmail.length < 3) {
      this.isUserNameOrEmailError = true;
      this.errorUserNameOrEmailMessageEn = '* Enter a valid username or email!'
      this.errorUserNameOrEmailMessageTr = '* Geçerli bir kullanıcı adı ya da e-posta girin!'
      return;
    } else {
      this.isUserNameOrEmailError = false;
    }
  }

  checkSignInPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.loginRequest.password.length < 6) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must be at least 6 characters.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isSigninPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.loginRequest.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one capital letter.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isSigninPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.loginRequest.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one lowercase letter.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isSigninPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.loginRequest.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one digit.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isSigninPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.loginRequest.password)) {
      this.isSigninPasswordError = true;
      this.errorSignInPasswordMessageEn = '* Your password must contain at least one special character.'
      this.errorSignInPasswordMessageTr = '* Şifreniz en az bir özel karakter içermelidir.'
      return;
    } else {
      this.isSigninPasswordError = false;
    }
  }

  checkSignUpPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.registerRequest.password.length < 6) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must be at least 6 characters.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isSignupPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.registerRequest.password)) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must contain at least one capital letter.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isSignupPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.registerRequest.password)) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must contain at least one lowercase letter.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isSignupPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.registerRequest.password)) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must contain at least one digit.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isSignupPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.registerRequest.password)) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must contain at least one special character.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az bir özel karakter içermelidir.'
      return;
    } else {
      this.isSignupPasswordError = false;
    }
  }

  checkSignUpConfPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.registerRequest.confirmedPassword.length < 6) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must be at least 6 characters.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.registerRequest.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one capital letter.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.registerRequest.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one lowercase letter.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.registerRequest.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one digit.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.registerRequest.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one special character.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir özel karakter içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }
  }
}