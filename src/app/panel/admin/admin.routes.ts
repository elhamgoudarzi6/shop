import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { SliderComponent } from './slider/slider.component';
import { ConfigComponent } from './config/config.component';
import { PaymentComponent } from './payment/payment.component';
import { BannerComponent } from './banner/banner.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { DiscountComponent } from './discount/discount.component';
import { FeatureComponent } from './feature/feature.component';

export const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'cat', component: CategoryComponent },
      { path: 'product', component: ProductComponent },
      { path: 'discount', component: DiscountComponent },
      { path: 'feature', component: FeatureComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'user', component: UsersComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'banner', component: BannerComponent },
      { path: 'config', component: ConfigComponent },
    ],
  }];
