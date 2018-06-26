import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DomainAvailabilityComponent } from './components/domain-availability/domain-availability.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DomainListComponent } from './components/domain-list/domain-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';
import { SubdomainPurchaseComponent } from './components/subdomain-purchase/subdomain-purchase.component';
import { AvailabilityPageComponent } from './components/availability-page/availability-page.component';
import { ChooseOfferComponent } from './components/choose-offer/choose-offer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'sprawdz-dostepnosc', component: AvailabilityPageComponent},
  {path: 'lista-twoich-domen', component: DomainListComponent},
  {path: 'kontakt', component: ContactUsComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'edytuj-dane', component: UserDataFormComponent},
  {path: 'kup', component: SubdomainPurchaseComponent},
  {path: 'platnosc', component: CheckoutComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
