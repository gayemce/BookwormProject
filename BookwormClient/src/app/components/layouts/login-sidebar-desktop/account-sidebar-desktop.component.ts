import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';


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
    public login: LoginRegisterService
  ) { }

  ngOnInit(){
    this.responseInLocalStorage = localStorage.getItem("response");
  }

  signIn() {
    this.login.signIn();
    if (this.closeBtn != undefined) {
      this.closeBtn.nativeElement.click();
    }
    if(this.responseInLocalStorage){
      this.router.navigateByUrl("/my-account")
    }
  }

  createAccount() {
    if (this.closeBtn != undefined) {
      this.closeBtn.nativeElement.click();
    }
    this.login.signUp();
  }
}