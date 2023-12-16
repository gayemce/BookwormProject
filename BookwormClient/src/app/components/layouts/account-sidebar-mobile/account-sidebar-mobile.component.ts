import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account-sidebar-mobile',
  templateUrl: './account-sidebar-mobile.component.html',
  styleUrls: ['./account-sidebar-mobile.component.css']
})
export class AccountSidebarMobileComponent {

  constructor(
    public login: LoginService
  ){}
}
