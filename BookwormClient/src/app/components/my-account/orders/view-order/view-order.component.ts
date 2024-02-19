import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OrderModel } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
    selector: 'app-view-order',
    standalone: true,
    imports: [TranslateModule, CommonModule, TrCurrencyPipe],
    templateUrl: './view-order.component.html',
    styleUrl: './view-order.component.css',
    providers: [DatePipe]
})
export class ViewOrderComponent {

    orders: OrderModel[] = [];
    paymentDetails: string = "";
    total: number = 0;
    addComment = false;

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private activated: ActivatedRoute,
        private error: ErrorService,
        public shopping: ShoppingCartService,
        public selectLang: SelectedLanguageService,
    ) {
        auth.checkAuthentication();
        this.activated.params.subscribe(res => {
            http.get<OrderModel[]>(`https://localhost:7018/api/Orders/GetAllOrdersDetailByUserId/${auth.token.userId}/${res["order-id"]}`).subscribe({
                next: (res: any) => {
                    this.orders = res;
                    this.commentBtnHideorShow();
                },
                error: (err: HttpErrorResponse) => {
                    error.errorHandler(err);
                }
            })
        })
    }

    calcTotal(): number {
        this.total = 0;
        if (this.orders[0].paymentCurrency === '₺') {
            for (let i = 0; i < this.orders[0].books.length; i++) {
                if (this.orders[0].books[i].currency === '₺') {
                    this.total += (this.orders[0].books[i].price * this.orders[0].books[i].quantity);
                }
                else if (this.orders[0].books[i].currency === '$') {
                    this.total += ((this.orders[0].books[i].price * 30) * this.orders[0].books[i].quantity);
                }
            }
        }
        else {
            for (let i = 0; i < this.orders[0].books.length; i++) {
                if (this.orders[0].books[i].currency === '$') {
                    this.total += (this.orders[0].books[i].price * this.orders[0].books[i].quantity);
                }
                else if (this.orders[0].books[i].currency === '₺') {
                    this.total += ((this.orders[0].books[i].price / 30) * this.orders[0].books[i].quantity);
                }
            }
        }
        return this.total;
    }

    commentBtnHideorShow() {
        if (this.orders[0].statusTr === "Teslim Edildi" || this.orders[0].statusEn === "Delivered") {
          this.addComment = true;
        }
        else {
            this.addComment = false;
        }
      }
}