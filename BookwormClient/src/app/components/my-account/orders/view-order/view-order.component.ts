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
import { SwalService } from 'src/app/services/swal.service';
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

    constructor(
        private http: HttpClient,
        public shopping: ShoppingCartService,
        private swal: SwalService,
        private auth: AuthService,
        private error: ErrorService,
        private activated: ActivatedRoute,
        public selectLang: SelectedLanguageService,
    ) {      

        auth.checkAuthentication();
        this.activated.params.subscribe(res => {
            http.get<OrderModel[]>(`https://localhost:7018/api/Orders/GetAllOrdersDetailByUserId/${auth.token.userId}/${res["order-id"]}`).subscribe({
                next: (res: any) => {
                    this.orders = res;
                },
                error: (err: HttpErrorResponse) => {
                    error.errorHandler(err);
                }
            })
        })
    }

    calcTotal(): number {
        this.total = 0;

        if(this.orders[0].paymentCurrency === '₺'){
            for (let i = 0; i < this.orders[0].books.length; i++) {
                if(this.orders[0].books[i].currency === '₺'){
                    this.total += (this.orders[0].books[i].price * this.orders[0].books[i].quantity);
                    console.log(this.total);
                }
                else if(this.orders[0].books[i].currency === '$'){
                    this.total += ((this.orders[0].books[i].price * 30) * this.orders[0].books[i].quantity);
                }     
            }
        }
        else{
            for (let i = 0; i < this.orders[0].books.length; i++) {
                if(this.orders[0].books[i].currency === '$'){
                    this.total += (this.orders[0].books[i].price * this.orders[0].books[i].quantity);
                }
                else if(this.orders[0].books[i].currency === '₺'){
                    this.total += ((this.orders[0].books[i].price / 30) * this.orders[0].books[i].quantity);
                }     
            }
        }
        return this.total;          
    }
}