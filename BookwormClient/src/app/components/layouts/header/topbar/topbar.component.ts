import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { SelectedLanguageService } from 'src/app/services/selected-language.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    standalone: true,
    imports: [RouterLink, TranslateModule]
})
export class TopbarComponent {

  language: string = "en";

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    public selectLang: SelectedLanguageService
  ){
    if(localStorage.getItem("language")){
      this.language = localStorage.getItem("language") as string;
      console.log(this.language);
    }

    translate.setDefaultLang(this.language)
  }

  ngAfterViewInit(){
    // Bu metot bileşenin görünümü tamamen oluşturulduktan sonra çalışır
    this.changeLanguageElemenentInnerText()
  }

  switchLanguage(value: string){
    localStorage.setItem("language", value);
    this.language = value;
    location.reload();
    this.translate.use(this.language);
  }

  changeLanguageElemenentInnerText(){
    let languageElement: HTMLElement | any = document.getElementById('basicDropdownHoverInvoker1');
    let language = localStorage.getItem("language");

    if(language === "tr"){
      languageElement.innerText = "Türkçe";
    }
    else if(language === "en"){
      languageElement.innerText = "English"
    }
  }
}
