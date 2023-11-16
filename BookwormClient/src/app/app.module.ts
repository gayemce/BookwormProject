import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { AccountSidebarDesktopComponent } from './components/layouts/account-sidebar-desktop/account-sidebar-desktop.component';
import { AccountSidebarMobileComponent } from './components/layouts/account-sidebar-mobile/account-sidebar-mobile.component';
import { CartSidebarComponent } from './components/layouts/cart-sidebar/cart-sidebar.component';
import { CategoriesSidebarComponent } from './components/layouts/categories-sidebar/categories-sidebar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DealsWithProductTabComponent } from './components/home/deals-with-product-tab/deals-with-product-tab.component';
import { BestsellingBooksComponent } from './components/home/bestselling-books/bestselling-books.component';
import { BiographiesBooksComponent } from './components/home/biographies-books/biographies-books.component';
import { BrandServicesComponent } from './components/home/brand-services/brand-services.component';
import { SlickCarouselComponent } from './components/home/slick-carousel/slick-carousel.component';
import { SidebarWithProductComponent } from './components/home/sidebar-with-product/sidebar-with-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';
import { OrderReceivedComponent } from './components/order-received/order-received.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { TopbarComponent } from './components/layouts/header/topbar/topbar.component';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { MiddlebarComponent } from './components/layouts/header/middlebar/middlebar.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HeaderComponent,
    AccountSidebarDesktopComponent,
    AccountSidebarMobileComponent,
    CartSidebarComponent,
    CategoriesSidebarComponent,
    FooterComponent,
    HomeComponent,
    DealsWithProductTabComponent,
    BestsellingBooksComponent,
    BiographiesBooksComponent,
    BrandServicesComponent,
    SlickCarouselComponent,
    SidebarWithProductComponent,
    CartComponent,
    CheckoutComponent,
    ShopListComponent,
    MyAccountComponent,
    SingleProductComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    OrderReceivedComponent,
    OrderTrackingComponent,
    TermsAndConditionsComponent,
    TopbarComponent,
    MiddlebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
