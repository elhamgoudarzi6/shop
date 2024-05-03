import {  Component } from '@angular/core';
import { HeroComponent } from "./slider/slider.component";
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ServiceComponent } from './service/service.component';
import { BannerComponent } from './banner/banner.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OfferProductComponent } from './offer-product/offer-product.component';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, FooterComponent, HeroComponent,BannerComponent,ServiceComponent,NewProductComponent,OfferProductComponent]
})
export class HomeComponent {

}
