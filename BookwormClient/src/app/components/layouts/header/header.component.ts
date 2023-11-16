import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild("browseCategoriesBtn") categoriesBtn: ElementRef<HTMLButtonElement> | undefined

  constructor(){
    this.closeCategories();
  }

  closeCategories(){
    setTimeout(() => {
      if(this.categoriesBtn != undefined){
        this.categoriesBtn.nativeElement.click();
      }
    }, 1000);
  }

}
