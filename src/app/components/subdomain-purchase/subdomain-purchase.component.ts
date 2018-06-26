import { Component, OnInit } from '@angular/core';
import { DomainAvailabilityComponent } from '../domain-availability/domain-availability.component';
import { ChooseOfferComponent } from '../choose-offer/choose-offer.component';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-subdomain-purchase',
  templateUrl: './subdomain-purchase.component.html',
  styleUrls: ['./subdomain-purchase.component.css']
})
export class SubdomainPurchaseComponent implements OnInit {

  step:number; 

  domainToPurchase(query){
    console.log(query);
  }
  
  constructor(){ }

  
  ngOnInit(){
    this.step = 1;
  }

  
   

}
