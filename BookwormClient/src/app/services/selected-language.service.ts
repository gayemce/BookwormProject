import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedLanguageService {

  userSelectedLanguage : string | null = "";

  constructor() {
    this.selectedLanguage();
   }

  selectedLanguage(): void{
    if(localStorage.getItem("language"))
      this.userSelectedLanguage = localStorage.getItem("language")
  }
}
