import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CategoriesSidebarComponent } from './categories-sidebar/categories-sidebar.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { AccountSidebarMobileComponent } from './login-sidebar-mobile/account-sidebar-mobile.component';
import { HeaderComponent } from './header/header.component';
import AccountSidebarDesktopComponent from './login-sidebar-desktop/account-sidebar-desktop.component';

@Component({
    selector: 'app-layouts',
    templateUrl: './layouts.component.html',
    styleUrls: ['./layouts.component.css'],
    standalone: true,
    imports: [HeaderComponent, AccountSidebarMobileComponent, AccountSidebarDesktopComponent, CartSidebarComponent, CategoriesSidebarComponent, RouterOutlet, FooterComponent]
})
export class LayoutsComponent {

}
