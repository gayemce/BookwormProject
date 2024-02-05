import { Component, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { ShopListByCategoryComponent } from './components/shop-list-by-category/shop-list-by-category.component';
import SingleProductComponent from './components/single-product/single-product.component';
import HomeComponent from './components/home/home.component';
import CategoriesComponent from './components/categories/categories.component';
import MyAccountComponent from './components/my-account/my-account.component';
import CartComponent from './components/cart/cart.component';
import AuthorsComponent from './components/authors/authors.component';
import CheckoutComponent from './components/checkout/checkout.component';
import OrderReceivedComponent from './components/order-received/order-received.component';
import OrderTrackingComponent from './components/order-tracking/order-tracking.component';
import AboutUsComponent from './components/about-us/about-us.component';
import ContactUsComponent from './components/contact-us/contact-us.component';
import FaqComponent from './components/faq/faq.component';
import TermsAndConditionsComponent from './components/terms-and-conditions/terms-and-conditions.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { OrdersComponent } from './components/my-account/orders/orders.component';
import { AddressesComponent } from './components/my-account/addresses/addresses.component';
import { AccountDetailsComponent } from './components/my-account/account-details/account-details.component';
import { WishlistComponent } from './components/my-account/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutsComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "categories",
        component: CategoriesComponent
      },
      {
        path: 'shop-list',
        component: ShopListByCategoryComponent
      },
      {
        path: 'shop-list/:id',
        component: ShopListByCategoryComponent
      },
      {
        path: "single-product/:value",
        component: SingleProductComponent
      },
      {
        path: "shop-list/:id/single-product/:value",
        component: SingleProductComponent
      },
      {
        path: "authors",
        component: AuthorsComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "checkout",
        component: CheckoutComponent
      },
      {
        path: "wish-list",
        component: WishListComponent
      },
      {
        path: "order-received",
        component: OrderReceivedComponent
      },
      {
        path: "order-tracking",
        component: OrderTrackingComponent
      },
      {
        path: "my-account",
        component: MyAccountComponent
      },
      {
        path: "orders",
        component: OrdersComponent
      },
      {
        path: "addresses",
        component: AddressesComponent
      },
      {
        path: "account-details",
        component: AccountDetailsComponent
      },
      {
        path: "wishlist",
        component: WishlistComponent
      },
      {
        path: "about-us",
        component: AboutUsComponent
      },
      {
        path: "contact-us",
        component: ContactUsComponent
      },
      {
        path: "faq",
        component: FaqComponent
      },
      {
        path: "terms-and-conditions",
        component: TermsAndConditionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }