import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-middlebar',
    templateUrl: './middlebar.component.html',
    styleUrls: ['./middlebar.component.css'],
    standalone: true,
    imports: [RouterLink, FormsModule, TranslateModule]
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
