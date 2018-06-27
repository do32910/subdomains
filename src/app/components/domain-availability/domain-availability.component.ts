import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SubdomainsService } from '../../services/subdomains.service';
import { Subdomain } from '../../models/Subdomain';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-domain-availability',
  templateUrl: './domain-availability.component.html',
  styleUrls: ['./domain-availability.component.css']
})

export class DomainAvailabilityComponent implements OnInit {
 
  private searchTerms = new Subject<string>();
  subdomains: Subdomain[];
  availability: boolean;
  showAvailability:boolean;
  constructor(private subdomainService: SubdomainsService){}
  

  
  hideAvailability(){
    this.showAvailability = false;
  }
  
  
  checkAvailability(query:string){
    this.availability = true;
    for(var q=0; q<this.subdomains.length; q++){
      if(this.subdomains[q].name==query){
        this.availability = false;
        break;    
      }
    }
    this.showAvailability = true;
  }

  ngOnInit(){
    this.subdomainService.getSubdomains().subscribe(subdomains => {
    this.subdomains = subdomains});    
    this.showAvailability = false;      
    }
    
    }