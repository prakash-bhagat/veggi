import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material/material.module';
import { NgxPrintModule } from 'ngx-print';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AllEmployeeComponent } from './components/all-employee/all-employee.component';
import { UsersOrdersComponent } from './components/users-orders/users-orders.component';
import { EmployeeOrdersComponent } from './components/employee-orders/employee-orders.component';
import { AddFruitsComponent } from './components/add-fruits/add-fruits.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AddvegetablesComponent } from './components/addvegetables/addvegetables.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UserBillComponent } from './components/user-bill/user-bill.component';
import { UserInvoiceComponent } from './components/user-invoice/user-invoice.component';
import { SocietyDataComponent } from './components/society-data/society-data.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DeliveryStatusComponent } from './components/delivery-status/delivery-status.component';
import { ConfirmationWithDataComponent } from './components/confirmation-with-data/confirmation-with-data.component';
import { FinalBillComponent } from './components/final-bill/final-bill.component';
import { FinalInvoiceComponent } from './components/final-invoice/final-invoice.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PushNotificationService } from './services/push-notification.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { NotificationService } from '../app/services/notification.service';
import { AsyncPipe } from '@angular/common';
import { SocietyComponent } from './components/society/society.component';
import { ContactsDataUserEndComponent } from './components/contacts-data-user-end/contacts-data-user-end.component';
import { OfferImageComponent } from './components/offer-image/offer-image.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AdminBillComponent } from './components/admin-bill/admin-bill.component';
import { AddDairyComponent } from './components/add-dairy/add-dairy.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AllUsersComponent,
    AllEmployeeComponent,
    UsersOrdersComponent,
    EmployeeOrdersComponent,
    AddFruitsComponent,
    InventoryComponent,
    AddvegetablesComponent,
    AddEmployeeComponent,
    UserBillComponent,
    UserInvoiceComponent,
    SocietyDataComponent,
    ConfirmationDialogComponent,
    DeliveryStatusComponent,
    ConfirmationWithDataComponent,
    FinalBillComponent,
    FinalInvoiceComponent,
    SocietyComponent,
    ContactsDataUserEndComponent,
    OfferImageComponent,
    CarouselComponent,
    AdminBillComponent,
    AddDairyComponent,
    LoginComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass: 'toast-top-right'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    //MatToolbarModule
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [NotificationService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
