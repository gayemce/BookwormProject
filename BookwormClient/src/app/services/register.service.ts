import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register.model';
import { TranslateService } from '@ngx-translate/core';
import { SwalService } from './swal.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  request: RegisterModel = new RegisterModel();

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

  isFirstNameError: boolean = false;
  isLastNameError: boolean = false;
  isUserNameError: boolean = false;
  isEmailError: boolean = false;
  isSignupPasswordError: boolean = false;
  isSignupConfPasswordError: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private swal: SwalService,
    private error: ErrorService
  ) { }

  signUp() {
    this.http.post("https://localhost:7018/api/Auth/Register", this.request).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl("/");

        const successMessage = res.message;
        this.translate.get(`(${successMessage})`).subscribe(
          res => {
            this.swal.callToast(res, 'success');
          }
        )
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    });
  }

  checkFirstName() {
    if (this.request.firstName.length < 3) {
      this.isFirstNameError = true;
      this.errorFirstNameMessageEn = '* Enter a valid name!'
      this.errorFirstNameMessageTr = '* Geçerli bir ad girin!'
      return;
    } else {
      this.isFirstNameError = false;
    }
  }

  checkLastName() {
    if (this.request.lastName.length < 3) {
      this.isLastNameError = true;
      this.errorLastNameMessageEn = '* Enter a valid surname!'
      this.errorLastNameMessageTr = '* Geçerli bir soyad girin!'
      return;
    } else {
      this.isLastNameError = false;
    }
  }

  checkUserName() {
    if (this.request.userName.length < 3) {
      this.isUserNameError = true;
      this.errorUserNameMessageEn = '* Enter a valid username!'
      this.errorUserNameMessageTr = '* Geçerli bir kullanıcı adı girin!'
      return;
    } else {
      this.isUserNameError = false;
    }
  }

  checkEmail() {
    if (!this.request.email) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Enter a valid email!";
      this.errorEmailMessageTr = "* Geçerli bir e-posta girin!";
    } else if (this.request.email.length < 3) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Enter a valid email!";
      this.errorEmailMessageTr = "* Geçerli bir e-posta girin!";
    } else if (!/^[^\s@]+@/.test(this.request.email)) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must contain an '@' sign!";
      this.errorEmailMessageTr = "* E-posta adresi '@' işareti içermelidir!";
    } else if (!/[a-zA-Z0-9]/.test(this.request.email.split('@')[1])) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must be continued after the '@' sign!"
      this.errorEmailMessageTr = "* E-posta adresi '@'  işaretinden sonra devam ettirilmelidir!";
    } else if (!/\./.test(this.request.email.split('@')[1])) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must contain a '.' sign!";
      this.errorEmailMessageTr = "* E-posta adresi '.' işareti içermelidir!";
    } else if (!/[a-zA-Z0-9]/.test(this.request.email.split('.')[1])) {
      this.isEmailError = true;
      this.errorEmailMessageEn = "* Email address must be continued after the '.' sign!";
      this.errorEmailMessageTr = "* E-posta adresi '.' işaretinden sonra devam ettirilmelidir!";
    } else {
      this.isEmailError = false;
    }
  }

  checkSignUpPassword() {
    // Şifreniz en az 6 karakter olmalıdır.
    if (this.request.password.length < 6) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must be at least 6 characters.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isSignupPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.request.password)) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must contain at least one capital letter.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isSignupPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.request.password)) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must contain at least one lowercase letter.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isSignupPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.request.password)) {
      this.isSignupPasswordError = true;
      this.errorSignUpPasswordMessageEn = '* Your password must contain at least one digit.'
      this.errorSignUpPasswordMessageTr = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isSignupPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.request.password)) {
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
    if (this.request.confirmedPassword.length < 6) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must be at least 6 characters.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az 6 karakter olmalıdır.'
      return;
    }
    else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre büyük harf içermelidir
    if (!/[A-Z]/.test(this.request.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one capital letter.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir büyük harf içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre küçük harf içermelidir
    if (!/[a-z]/.test(this.request.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one lowercase letter.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir küçük harf içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre rakam içermelidir
    if (!/\d/.test(this.request.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one digit.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir rakam içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }

    // Şifre özel karakter içermelidir (örneğin: !@#$%^&*)
    if (!/[!@#$%^&*]/.test(this.request.confirmedPassword)) {
      this.isSignupConfPasswordError = true;
      this.errorSignUpConfPasswordMessageEn = '* Your password must contain at least one special character.'
      this.errorSignUpConfPasswordMessageTr = '* Şifreniz en az bir özel karakter içermelidir.'
      return;
    } else {
      this.isSignupConfPasswordError = false;
    }
  }
}
