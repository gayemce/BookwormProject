import { Component, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { ShopListByCategoryComponent } from './components/shop-list-by-category/shop-list-by-category.component';
import SingleProductComponent from './components/single-product/single-product.component';
import { AuthService } from './services/auth.service';
import HomeComponent from './components/home/home.component';
import CategoriesComponent from './components/categories/categories.component';

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
        path: 'shop-list/:id',
        component: ShopListByCategoryComponent
      },
      // {
      //   path: "shop-list",
      //   component: ShopListComponent
      // },
      {
        path: "shop-list/:id/single-product/:value",
        component: SingleProductComponent
      },
      // {
      //   path: "single-product/:value",
      //   loadComponent:()=> import("./components/single-product/single-product.component")
      // },
      {
        path: "authors",
        loadComponent: () => import("./components/authors/authors.component")
      },
      {
        path: "cart",
        loadComponent: () => import("./components/cart/cart.component")
      },
      {
        path: "checkout",
        loadComponent: () => import("./components/checkout/checkout.component")
      },
      {
        path: "order-received",
        loadComponent: () => import("./components/order-received/order-received.component")
      },
      {
        path: "order-tracking",
        loadComponent: () => import("./components/order-tracking/order-tracking.component")
      },
      {
        path: "my-account",
        loadComponent: () => import("./components/my-account/my-account.component")
      },
      {
        path: "about-us",
        loadComponent: () => import("./components/about-us/about-us.component")
      },
      {
        path: "contact-us",
        loadComponent: () => import("./components/contact-us/contact-us.component")
      },
      {
        path: "faq",
        loadComponent: () => import("./components/faq/faq.component")
      },
      {
        path: "terms-and-conditions",
        loadComponent: () => import("./components/terms-and-conditions/terms-and-conditions.component")
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }