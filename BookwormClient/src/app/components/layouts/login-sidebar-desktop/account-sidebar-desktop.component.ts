import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Message } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { MessagesModule } from 'primeng/messages';


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

  @ViewChild("accountSidebarCloseBtn") closeBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private router: Router,
    public login: LoginRegisterService,
    public selectLang: SelectedLanguageService
  ) { 
    this.updateSignInButtonStatus();
  }

  ngOnInit() {
    this.responseInLocalStorage = localStorage.getItem("response");
  }

  signIn() {
    // if(this.updateSignInButtonStatus() === true){
    //   this.messageSignInEn = [{severity: 'error', detail: 'Please Fill All Spaces!'}];
    //   this.messageSignInTr = [{severity: 'error', detail: 'Lütfen Tüm Alanları Doldurun!'}];
    //   this.login.signIn();
    // }
    this.login.signIn();
    if (this.closeBtn != undefined) {
      this.closeBtn.nativeElement.click();
    }
    if (this.responseInLocalStorage) {
      this.router.navigateByUrl("/my-account")
    }    
  }

  createAccount() {
    if(this.updateSignUpButtonStatus() === true){
      this.messageSignUpEn = [{severity: 'error', detail: 'Please Fill All Spaces!'}];
      this.messageSignUpTr = [{severity: 'error', detail: 'Lütfen Tüm Alanları Doldurun!'}];
      this.login.signUp();
    }
    else{
      if (this.closeBtn != undefined) {
        this.closeBtn.nativeElement.click();
      }
      this.login.signUp();
      this.clearInputs();
    }
  }

  clearInputs(){  
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
    return (!this.login.isFirstNameError && !this.login.isLastNameError && !this.login.isEmailError && !this.login.isUserNameError && !this.login.isSignupPasswordError && !this.login.isSignupConfPasswordError)
  }
}