//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//services
import { SubdomainsService } from './services/subdomains.service';
import { UserDataService } from './services/user-data.service';
import { PostService } from './services/post.service';
import { UsersDomainsService } from './services/users-domains.service'; 
//routes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DomainAvailabilityComponent } from './components/domain-availability/domain-availability.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { DomainListComponent } from './components/domain-list/domain-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ActiveUserComponent } from './components/active-user/active-user.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';
import { SubdomainPurchaseComponent } from './components/subdomain-purchase/subdomain-purchase.component';
import { AvailabilityPageComponent } from './components/availability-page/availability-page.component';
import { ChooseOfferComponent } from './components/choose-offer/choose-offer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    DomainAvailabilityComponent,
    SidebarComponent,
    NotFoundComponent,
    FooterComponent,
    DomainListComponent,
    ContactUsComponent,
    LoginFormComponent,
    ActiveUserComponent,
    UserDataFormComponent,
    SubdomainPurchaseComponent,
    AvailabilityPageComponent,
    ChooseOfferComponent,
    CheckoutComponent,
    PostComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SubdomainsService,
    UserDataService,
    UsersDomainsService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
