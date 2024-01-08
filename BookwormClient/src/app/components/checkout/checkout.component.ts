import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export default class CheckoutComponent {

    constructor(
        public shopping: ShoppingCartService
    ){}
}
