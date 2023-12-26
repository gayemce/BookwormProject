import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.css'],
    standalone: true
})
export default class MyAccountComponent {

  constructor(
    private router: Router,
    public auth: AuthService
  ){}

  logout(){
    localStorage.removeItem("response");
    location.href = "/"
  }
}
