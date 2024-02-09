import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OrderModel } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
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

    order: OrderModel[] = [];

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

        if (paymentDetailsString) {
            this.payment = JSON.parse(paymentDetailsString);
        }
        if (bookPricesString) {
            this.bookPrices = JSON.parse(bookPricesString);
        }
        if (localStorage.getItem('shippingPrice')) {
            this.shippingPrice = localStorage.getItem('shippingPrice');
            // console.log(this.shippingPrice);
        }
    }

    constructor(
        private http: HttpClient,
        public shopping: ShoppingCartService,
        private swal: SwalService,
        private auth: AuthService,
        private error: ErrorService,
        public selectLang: SelectedLanguageService
    ) {
        auth.checkAuthentication();
        http.get("https://localhost:7018/api/Orders/OrderReceivedByUserId/" + auth.token.userId).subscribe({
            next: (res: any) => {
                this.order = res;
                console.log(this.order);
            },
            error: (err: HttpErrorResponse) => {
                error.errorHandler(err);
            }
        })
    }
}
