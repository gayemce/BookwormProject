import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Cities } from 'src/app/constants/cities';
import { Countries } from 'src/app/constants/countries';
import { Months } from 'src/app/constants/months';
import { Years } from 'src/app/constants/years';
import { PaymentModel } from 'src/app/models/payment.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SwalService } from 'src/app/services/swal.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule, TranslateModule, TrCurrencyPipe, RouterLink]
})
export default class CheckoutComponent {

    currency: string = "";
    shippingAndCartTotal: string = "";
    paymentRequest: PaymentModel = new PaymentModel();
    countries = Countries;
    cities = Cities;
    months = Months;
    years = Years;
    isSameAddress: boolean = false;

    constructor(
        public shopping: ShoppingCartService,
        private router: Router,
        private translate: TranslateService,
        private swal: SwalService
    ) {
        if (localStorage.getItem("currency")) {
            this.currency = localStorage.getItem("currency") as string;
            this.shopping.onCurrencyButtonClick(this.currency);
        }

        // if (localStorage.getItem("cartTotal")) {
        //     this.cartTotal = localStorage.getItem("cartTotal") as string;
        // }

    }

    payment() {
        this.paymentRequest.books = this.shopping.shoppingCarts;
        this.paymentRequest.shippingAndCartTotal = Number(localStorage.getItem("shippingAndCartTotal"));
        this.paymentRequest.currency = this.currency;

        this.shopping.payment(this.paymentRequest, (res) => {
            localStorage.removeItem("shoppingCarts");
            this.shopping.shoppingCarts = [];
            this.shopping.shoppingCarts.length = 0;
            // Buradan devam edilecek
            localStorage.removeItem("shippingAndCartTotal");
            // localStorage.removeItem("currency");
            localStorage.setItem("paymentDetails", JSON.stringify(this.paymentRequest));
        })
    }

    changeIsSameAddress() {
        if (this.isSameAddress) {
            this.paymentRequest.billingAddress = this.paymentRequest.shippingAddress;
        }
    }

    onIdentityNumberInput(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }

    onPhoneNumberInput(event: any) {
        event.target.value = event.target.value.replace(/[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, '');
    }

    onCardNumberInput(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }

    onCardCvcNumberInput(event: any) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }

}
