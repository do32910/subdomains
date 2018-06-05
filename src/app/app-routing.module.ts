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

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'domain-availability', component: DomainAvailabilityComponent},
  {path: 'domain-list', component: DomainListComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: '*', component: NotFoundComponent}
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
