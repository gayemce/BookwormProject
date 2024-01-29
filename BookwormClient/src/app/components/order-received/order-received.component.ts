import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SwalService } from 'src/app/services/swal.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
    selector: 'app-order-received',
    templateUrl: './order-received.component.html',
    styleUrls: ['./order-received.component.css'],
    standalone: true,
    imports: [TranslateModule, CommonModule, TrCurrencyPipe]
})
export default class OrderReceivedComponent {

    payment: any;
    bookPrices: any;
    shippingPrice: any;
    now: Date = new Date();
    year: number = this.now.getFullYear();
    monthNamesEn: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    monthNameEn: string = this.monthNamesEn[this.now.getMonth()];

    monthNamesTr: string[] = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    monthNameTr: string = this.monthNamesTr[this.now.getMonth()];
    day: number = this.now.getDate();


    ngOnInit() {
        const paymentDetailsString = localStorage.getItem('paymentDetails');
        const bookPricesString = localStorage.getItem('bookPrices');

        if(paymentDetailsString) {
            this.payment = JSON.parse(paymentDetailsString);
        }
        if(bookPricesString) {
            this.bookPrices = JSON.parse(bookPricesString);
        }
        if(localStorage.getItem('shippingPrice')) {
            this.shippingPrice = localStorage.getItem('shippingPrice');
            // console.log(this.shippingPrice);
        }
    }

    constructor(
        public shopping: ShoppingCartService,
        private translate: TranslateService,
        private swal: SwalService
    ) {
        
        console.log(`${this.monthNameEn} ${this.day}, ${this.year}`);
    }
}
