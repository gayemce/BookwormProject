import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OrderModel } from 'src/app/models/order-model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TrCurrencyPipe } from 'tr-currency';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TranslateModule, CommonModule, TrCurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  providers: [DatePipe]
})
export class OrdersComponent {

  orders: OrderModel[] = [];

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private auth: AuthService,
    public selectedLang: SelectedLanguageService,
    public shopping: ShoppingCartService
  ){
    auth.checkAuthentication();
    http.get("https://localhost:7018/api/Orders/GetAll/" + auth.token.userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders = res;
        console.log(this.orders);
      },
      error: (err: HttpErrorResponse) => {
        error.errorHandler(err);
      }
    })
  }

  logout(){
    localStorage.removeItem("response");
    this.shopping.getAllShoppingCarts();
    location.href = "/"
  }
}
