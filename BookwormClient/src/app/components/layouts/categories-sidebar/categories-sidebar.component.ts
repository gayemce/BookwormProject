import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-sidebar',
  templateUrl: './categories-sidebar.component.html',
  styleUrls: ['./categories-sidebar.component.css']
})
export class CategoriesSidebarComponent {

  language: string = "en";

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ){
    if(localStorage.getItem("language")){
      this.language = localStorage.getItem("language") as string;
    }

    translate.setDefaultLang(this.language);
  }

  switchLanguage(event: any){
   localStorage.setItem("language", event.target.value);
   this.language = event.target.value;
   this.translate.use(this.language);
   location.reload();
  }

  changeLanguageElemenentInnerText(){
    
  }
}
