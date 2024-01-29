import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Message } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { MessagesModule } from 'primeng/messages';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-account-sidebar-desktop',
  templateUrl: './account-sidebar-desktop.component.html',
  styleUrls: ['./account-sidebar-desktop.component.css'],
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule, MessagesModule]
})
export default class AccountSidebarDesktopComponent {

  responseInLocalStorage: any;
  messageSignInEn: Message[] | any;
  messageSignInTr: Message[] | any;
  messageSignUpEn: Message[] | any;
  messageSignUpTr: Message[] | any;

  passwordsignInHidden = true;
  passwordsignUpHidden = true;
  passwordConfirmSignUpHidden = true;

  @ViewChild("accountSidebarCloseBtn") closeBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private router: Router,
    public login: LoginService,
    public register: RegisterService,
    public selectLang: SelectedLanguageService
  ) {
    this.updateSignInButtonStatus();
  }

  ngOnInit() {
    this.responseInLocalStorage = localStorage.getItem("response");
  }

  signIn() {
    this.login.signIn();
    if (this.closeBtn != undefined) {
      this.closeBtn.nativeElement.click();
    }
    if (this.responseInLocalStorage) {
      this.router.navigateByUrl("/my-account")
    }
  }

  toggleSignInPasswordVisibility() {
    this.passwordsignInHidden = !this.passwordsignInHidden;
  }

  toggleSignUpPasswordVisibility() {
    this.passwordsignUpHidden = !this.passwordsignUpHidden;
  }

  toggleConfirmSignUpPasswordVisibility() {
    this.passwordConfirmSignUpHidden = !this.passwordConfirmSignUpHidden;
  }

  createAccount() {
    if (this.closeBtn != undefined) {
      this.closeBtn.nativeElement.click();
      this.clearInputs();
    }
    this.register.signUp();
  }

  clearInputs() {
    let signupFirstname = document.getElementById('signupFirstname') as HTMLInputElement;
    let signupLastname = document.getElementById('signupLastname') as HTMLInputElement;
    let signupUsername = document.getElementById('signupUsername') as HTMLInputElement;
    let signupEmail = document.getElementById('signupEmail') as HTMLInputElement;
    let signupPassword = document.getElementById('signupPassword') as HTMLInputElement;
    let signupConfirmPassword = document.getElementById('signupConfirmPassword') as HTMLInputElement;

    if (signupFirstname && signupFirstname.value.length > 0)
      signupFirstname.value = '';

    if (signupLastname && signupLastname.value.length > 0)
      signupLastname.value = '';

    if (signupUsername && signupUsername.value.length > 0)
      signupUsername.value = '';

    if (signupEmail && signupEmail.value.length > 0)
      signupEmail.value = '';

    if (signupPassword && signupPassword.value.length > 0)
      signupPassword.value = '';

    if (signupConfirmPassword && signupConfirmPassword.value.length > 0)
      signupConfirmPassword.value = '';
  }

  updateSignInButtonStatus(): boolean {
    return (!this.login.isUserNameOrEmailError && !this.login.isSigninPasswordError);
  }

  updateSignUpButtonStatus(): boolean {
    return (!this.register.isFirstNameError && !this.register.isLastNameError && !this.register.isEmailError && !this.register.isUserNameError && !this.register.isSignupPasswordError && !this.register.isSignupConfPasswordError)
  }
}