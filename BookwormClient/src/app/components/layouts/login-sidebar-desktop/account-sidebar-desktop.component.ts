import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account-sidebar-desktop',
  templateUrl: './account-sidebar-desktop.component.html',
  styleUrls: ['./account-sidebar-desktop.component.css']
})
export default class AccountSidebarDesktopComponent {
  
  constructor(
    public login: LoginService
  ){}
}
