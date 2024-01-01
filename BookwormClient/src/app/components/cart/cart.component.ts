import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: true,
    imports: [FormsModule, TranslateModule, CommonModule]
})
export default class CartComponent {

    constructor(
        public shopping: ShoppingCartService
    ){}
}
