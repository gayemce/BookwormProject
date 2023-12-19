import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export default class MyAccountComponent {

  constructor(
    private router: Router
  ){}

  logout(){
    localStorage.removeItem("response");
    location.href = "/"
  }
}
