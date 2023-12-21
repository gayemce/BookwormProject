import { Component } from '@angular/core';
import { ScienceFictionBooksComponent } from './science-fiction-books/science-fiction-books.component';
import { SidebarWithProductComponent } from './sidebar-with-product/sidebar-with-product.component';
import { BestsellingBooksComponent } from './bestselling-books/bestselling-books.component';
import { DealsWithProductTabComponent } from './deals-with-product-tab/deals-with-product-tab.component';
import { BrandServicesComponent } from './brand-services/brand-services.component';
import { SlickCarouselComponent } from './slick-carousel/slick-carousel.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [SlickCarouselComponent, BrandServicesComponent, DealsWithProductTabComponent, BestsellingBooksComponent, SidebarWithProductComponent, ScienceFictionBooksComponent]
})
export default class HomeComponent {
    
}
