import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.css'],
    standalone: true,
    imports: [TranslateModule]
})
export default class MyAccountComponent {

  constructor(
    private router: Router,
    public auth: AuthService,
    public translate: TranslateService,
    public selectedLang: SelectedLanguageService
  ){}

  logout(){
    localStorage.removeItem("response");
    location.href = "/"
    // this.router.navigateByUrl("/")
  }
}
