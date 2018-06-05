import { Component, OnInit } from '@angular/core';
import { SubdomainsService } from '../../services/subdomains.service';
import { Subdomain } from '../../models/Subdomain';

@Component({
  selector: 'app-domain-availability',
  templateUrl: './domain-availability.component.html',
  styleUrls: ['./domain-availability.component.css']
})

export class DomainAvailabilityComponent implements OnInit {


  subdomains: Subdomain[];
  
  constructor(private subdomainService: SubdomainsService){}

    ngOnInit(){
      this.subdomainService.getSubdomains().subscribe(subdomains => {
        console.log(subdomains);
        this.subdomains = subdomains;
        });
    }

  }



//   import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-domain-availability',
//   templateUrl: './domain-availability.component.html',
//   styleUrls: ['./domain-availability.component.css']
// })
// export class DomainAvailabilityComponent implements OnInit {

//   constructor(){}

//     ngOnInit(){

//     }

//   }

