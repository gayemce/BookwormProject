import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';


@Component({
  selector: 'app-account-sidebar-desktop',
  templateUrl: './account-sidebar-desktop.component.html',
  styleUrls: ['./account-sidebar-desktop.component.css'],
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule]
})
export default class AccountSidebarDesktopComponent {

  responseInLocalStorage: any;

  @ViewChild("accountSidebarCloseBtn") closeBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private router: Router,
    public login: LoginRegisterService,
    public selectLang: SelectedLanguageService
  ) { }

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

  createAccount() {
    if (this.closeBtn != undefined) {
      this.closeBtn.nativeElement.click();
    }
    this.login.signUp();
    this.clearInputs();
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
}