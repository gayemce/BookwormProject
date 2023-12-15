import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-account-sidebar-desktop',
  templateUrl: './account-sidebar-desktop.component.html',
  styleUrls: ['./account-sidebar-desktop.component.css']
})
export class AccountSidebarDesktopComponent {

  request: LoginModel = new LoginModel();

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private error: ErrorService
  ){}

  signIn(){
    if(this.request.userNameOrEmail.length < 3){
      console.log('Geçerli bir kullanıcı adı ya da email adresi girin.');
      return;
    }

    if(this.request.password.length < 6){
      console.log('Şifreniz en az 6 karakter olmalıdır.');
      return;
    }

    this.http.post("https://localhost:7018/api/Auth/Login", this.request).subscribe({
      next: (res:any) => {
        localStorage.setItem("response", JSON.stringify(res));
        this.router.navigateByUrl("/");
      }
    })
  }
}
