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
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      this.userSelectedLanguage = storedLanguage;
    }
  }
}
