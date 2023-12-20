import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account-sidebar-desktop',
  templateUrl: './account-sidebar-desktop.component.html',
  styleUrls: ['./account-sidebar-desktop.component.css']
})
export default class AccountSidebarDesktopComponent {

  responseInLocalStorage: any;
  @ViewChild("accountSidebarCloseBtn") closeBtn: ElementRef<HTMLButtonElement> | undefined;

  constructor(
    private router: Router,
    public login: LoginService
  ) { }

  ngOnInit(){
    this.responseInLocalStorage = localStorage.getItem("response");
  }

  handleButtonClick() {
    this.login.signIn();
    this.goToMyAccount();
  }

  goToMyAccount() {
    if (this.closeBtn != undefined) {
      this.closeBtn.nativeElement.click();
    }
    if(localStorage.getItem("response"))
    this.router.navigateByUrl("/my-account")
  }
}

