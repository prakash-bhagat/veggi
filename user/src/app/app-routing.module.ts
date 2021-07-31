import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileGuard} from './guard/profile.guard';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {HomeLayoutComponent} from './components/home-layout/home-layout.component';
import { DefaultComponent } from './components/default/default.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewInvoiceComponent } from './components/view-invoice/view-invoice.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { VegetablesComponent } from './components/vegetables/vegetables.component';
import { DairyComponent } from './components/dairy/dairy.component';
import { OrderFailedComponent } from './components/order-failed/order-failed.component';
import { CartEmptyComponent } from './components/cart-empty/cart-empty.component';
import { ProcessComponent } from './components/process/process.component';


const routes: Routes = [
  // Define routes for the landing / home page, create a separate component for the layout of home page
  // put only header, footer and router-outlet there redirectTo: '/default',
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path:'',redirectTo:'/default', pathMatch:'full', 
      },
      {
        path: 'default', component: DefaultComponent
      },
      {
        path: 'home', component: HomeComponent, 
      },
      {
        path:'fruits', component:FruitsComponent,
      },
      {
        path: 'vegetables', component:VegetablesComponent,
      },
      {
        path: 'dairy', component:DairyComponent,
      },
      {
        path: 'product/:id', component: ProductComponent
      },
      {
        path: 'cart', component: CartComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'empty', component: CartEmptyComponent,canActivate:[ProfileGuard]
      },
      {
        path: 'checkout', component: CheckoutComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'thankyou', component: ThankyouComponent,canActivate: [ProfileGuard]
      },
      {
        path: 'fail', component: OrderFailedComponent,canActivate: [ProfileGuard]
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path:'changePassword', component:ChangePasswordComponent,canActivate: [ProfileGuard]
      },
      {
        path:'changeAddress', component:ChangeAddressComponent,canActivate: [ProfileGuard]
      },
      {
        path:'orderHistory', component:OrderHistoryComponent,canActivate: [ProfileGuard]
      },
      {
        path:'viewInvoice/:orderId', component:ViewInvoiceComponent,canActivate: [ProfileGuard]
      },
      {
        path:'wait', component:ProcessComponent,canActivate:[ProfileGuard]
      },
    ]
  },
  // Wildcard Route if no route is found == 404 NOTFOUND page
  {
    path: '**', component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
