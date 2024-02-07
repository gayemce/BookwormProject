import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UpdateUserInfomationModel } from 'src/app/models/update-user-information.model';
import { UpdateUserPasswordModel } from 'src/app/models/update-user-password.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SwalService } from 'src/app/services/swal.service';


@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {

  requestUserInfomation: UpdateUserInfomationModel = new UpdateUserInfomationModel();
  requestUserPassword: UpdateUserPasswordModel = new UpdateUserPasswordModel();

  currentPassword: string = "";
  newPassword: string = "";
  confirmedPassword: string = "";

  constructor(
    private http: HttpClient,
    public auth: AuthService,
    private error: ErrorService,
    private swal: SwalService,
    private translate: TranslateService,
    private shopping: ShoppingCartService
  ){
    this.auth.checkAuthentication();
    this.auth.getUser(); 
  }

  updateUserInformation(){
    this.requestUserInfomation.id = Number(this.auth.token.userId);
    this.requestUserInfomation.firstName = this.auth.firstName;
    this.requestUserInfomation.lastName = this.auth.lastName;
    this.requestUserInfomation.userName = this.auth.userName;
    this.requestUserInfomation.email = this.auth.email;

    this.http.post("https://localhost:7018/api/Auth/UpdateUserInformation/", this.requestUserInfomation).subscribe({
      next: (res: any) => {
        this.translate.get("Account information updated!").subscribe(
          (res: any) => {
            this.swal.callToast(res, 'success');
          }
        )
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  updateUserPassword(){
    this.requestUserPassword.id = Number(this.auth.token.userId);
    console.log(this.requestUserInfomation.id);
    this.requestUserPassword.currentPassword = this.currentPassword;
    this.requestUserPassword.newPassword = this.newPassword;
    this.requestUserPassword.confirmedPassword = this.confirmedPassword;

    this.http.post("https://localhost:7018/api/Auth/UpdateUserPassword/", this.requestUserPassword).subscribe({
      next: (res: any) => {
        this.translate.get("Account password updated!").subscribe(
          (res: any) => {
            this.swal.callToast(res, 'success');
          }
        )
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        this.error.errorHandler(err);
      }
    })
  }

  logout(){
    localStorage.removeItem("response");
    this.shopping.getAllShoppingCarts();
    location.href = "/"
  }
}