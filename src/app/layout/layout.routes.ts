import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { DashboardComponent } from './profile/dashboard/dashboard.component';
import { AccountComponent } from './profile/account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './profile/order/order.component';
import { MessageComponent } from './profile/message/message.component';
import { WalletComponent } from './profile/wallet/wallet.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from '../auth/auth-guard';
import { CartComponent } from './cart/cart.component';
import { ResultComponent } from './cart/result/result.component';

export const routes: Route[] = [{
  path: '', component: LayoutComponent,
  children: [
    { path: '', component: HomeComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'product', component: ProductComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: CartComponent},
    { path: 'result', component: ResultComponent },
    {
      path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
      children: [
        { path: '', component: DashboardComponent },
        { path: 'account', component: AccountComponent },
        { path: 'message', component: MessageComponent },
        { path: 'order', component: OrderComponent },
        { path: 'wallet', component: WalletComponent },
      ],
    }
  ],
}];







