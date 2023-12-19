import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrls: ['./middlebar.component.css']
})
export class MiddlebarComponent {

  responseInLocalStorage: any;

  constructor(
    public shopListBooks: ShopListBooksService,
    public auth: AuthService
  ){}

  ngOnInit(){
    this.auth.checkAuthentication();
    this.responseInLocalStorage = localStorage.getItem("response");
  }
}
