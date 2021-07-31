import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFruitsComponent } from './components/add-fruits/add-fruits.component';
import { AddvegetablesComponent } from './components/addvegetables/addvegetables.component';
import { AllEmployeeComponent } from './components/all-employee/all-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeOrdersComponent } from './components/employee-orders/employee-orders.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { UsersOrdersComponent } from './components/users-orders/users-orders.component';
import { UserBillComponent } from './components/user-bill/user-bill.component';
import { UserInvoiceComponent } from './components/user-invoice/user-invoice.component';
import { SocietyDataComponent } from './components/society-data/society-data.component';
import { DeliveryStatusComponent } from './components/delivery-status/delivery-status.component';
import { FinalBillComponent } from './components/final-bill/final-bill.component';
import { FinalInvoiceComponent } from './components/final-invoice/final-invoice.component';
import { SocietyComponent } from './components/society/society.component';
import { OfferImageComponent } from './components/offer-image/offer-image.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AdminBillComponent } from './components/admin-bill/admin-bill.component';
import { AddDairyComponent } from './components/add-dairy/add-dairy.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guard/login.guard';
const routes: Routes = [
  {
    path:'' , component:LoginComponent
  },
  {
    path:'dashboard' , component:DashboardComponent, canActivate: [LoginGuard]
  },
  {
    path:'society', component:SocietyDataComponent, canActivate: [LoginGuard]
  },
  {
    path:'all-users', component:AllUsersComponent, canActivate: [LoginGuard]
  },
  {
    path:'userorders', component:UsersOrdersComponent, canActivate: [LoginGuard]
  },
  {
    path:'bill/:orderId', component:UserBillComponent, canActivate: [LoginGuard]
  },
  {
    path:'invoice/:orderId', component:UserInvoiceComponent, canActivate: [LoginGuard]
  },
  {
    path:'allemployee', component:AllEmployeeComponent, canActivate: [LoginGuard]
  },
  {
    path:'adddairy', component:AddDairyComponent, canActivate: [LoginGuard]
  },
  {
    path:'employeeorders', component:EmployeeOrdersComponent, canActivate: [LoginGuard]
  },
  {
    path:'addemployee', component:AddEmployeeComponent, canActivate: [LoginGuard]
  },
  {
    path:'inventory', component:InventoryComponent, canActivate: [LoginGuard]
  },
  {
    path:'addfruits', component:AddFruitsComponent, canActivate: [LoginGuard]
  },
  {
    path:'addvegetables', component:AddvegetablesComponent, canActivate: [LoginGuard]
  },
  {
    path:'status', component: DeliveryStatusComponent, canActivate: [LoginGuard]
  },
  {
    path:'finalbill', component: FinalBillComponent, canActivate: [LoginGuard]
  },
  {
    path:'finalinvoice/:orderId', component: FinalInvoiceComponent, canActivate: [LoginGuard]
  },
  {
    path:'societydata', component: SocietyComponent, canActivate: [LoginGuard]
  },
  {
    path:'offer', component: OfferImageComponent, canActivate: [LoginGuard]
  },
  {
    path:'carousel', component: CarouselComponent, canActivate: [LoginGuard]
  },{
    path: 'adminBill', component: AdminBillComponent, canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
