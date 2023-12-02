import { Component } from '@angular/core';
import { ShopListBooksService } from 'src/app/services/shop-list-books.service';

@Component({
  selector: 'app-middlebar',
  templateUrl: './middlebar.component.html',
  styleUrls: ['./middlebar.component.css']
})
export class MiddlebarComponent {

  constructor(
    public shopListBooks: ShopListBooksService
  ){}
}
