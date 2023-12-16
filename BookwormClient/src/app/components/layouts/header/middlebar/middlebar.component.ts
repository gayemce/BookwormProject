import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrls: ['./middlebar.component.css']
})
export class MiddlebarComponent {

  constructor(
    public shopListBooks: ShopListBooksService,
    public login: LoginService
  ){}
}
