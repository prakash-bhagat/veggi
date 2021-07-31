import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from '@app/components/header/header.component';
import {FooterComponent} from '@app/components/footer/footer.component';
import {CartComponent} from '@app/components/cart/cart.component';
import {CheckoutComponent} from '@app/components/checkout/checkout.component';
import {HomeComponent} from '@app/components/home/home.component';
import {ProductComponent} from '@app/components/product/product.component';
import {ThankyouComponent} from '@app/components/thankyou/thankyou.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '@app/components/login/login.component';
import {ProfileComponent} from '@app/components/profile/profile.component';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {RegisterComponent} from '@app/components/register/register.component';
import {HomeLayoutComponent} from '@app/components/home-layout/home-layout.component';
import { DefaultComponent } from './components/default/default.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MaterialModule} from './material/material.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ViewInvoiceComponent } from './components/view-invoice/view-invoice.component';
import { FruitsComponent } from './components/fruits/fruits.component'
import { SocketioService } from './services/socketio.service';
import { VegetablesComponent } from './components/vegetables/vegetables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DairyComponent } from './components/dairy/dairy.component';
import { OrderFailedComponent } from './components/order-failed/order-failed.component';
import { CartEmptyComponent } from './components/cart-empty/cart-empty.component';
import { ProcessComponent } from './components/process/process.component';
// import { process } from './components/process/process.component';




const config = new AuthServiceConfig([
  //{
    //id: GoogleLoginProvider.PROVIDER_ID,
   /// provider: new GoogleLoginProvider('799705726167-vn6184fsovmps0kpbg5c7jabv15r3ias.apps.googleusercontent.com')
 // }

]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HomeLayoutComponent,
    DefaultComponent,
    CarouselComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    ChangeAddressComponent,
    OrderHistoryComponent,
    ViewInvoiceComponent,
    FruitsComponent,
    VegetablesComponent,
    DairyComponent,
    OrderFailedComponent,
    CartEmptyComponent,
    ProcessComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass: 'toast-top-right'
    }),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SocialLoginModule,
    NgbModule,
  ],
  providers: [SocketioService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
