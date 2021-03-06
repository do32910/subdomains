import { DomainAvailabilityComponent } from '../domain-availability/domain-availability.component';
import { ChooseOfferComponent } from '../choose-offer/choose-offer.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { SubdomainsService } from '../../services/subdomains.service';
import { Subdomain } from '../../models/Subdomain';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { fakeActiveUser } from '../../mockup/mock-activeuser';


@Component({
  selector: 'app-subdomain-purchase',
  templateUrl: './subdomain-purchase.component.html',
  styleUrls: ['./subdomain-purchase.component.css']
})
export class SubdomainPurchaseComponent implements OnInit {

  post: Post;
  @Output() newPost: EventEmitter<Post> = new EventEmitter();

  private searchTerms = new Subject<string>();
  subdomains: Subdomain[];
  availability: boolean;
  showAvailability:boolean;
  chosenOption = 1;
  subdomainToPurchase:string;
  wrongPattern:boolean;

  generateFakeIp(){
    return Math.floor(Math.random()*(99-10+1)+10) + '.' + Math.floor(Math.random()*(99-10+1)+10) + '.' + Math.floor(Math.random()*(99-10+1)+10) + '.' + Math.floor(Math.random()*(99-10+1)+10);
  }

  addPost(id_user, name, at, ip_address, purchase_date, expiration_date) {
    ip_address = this.generateFakeIp();
    purchase_date = this.createRegistrationDate();
    expiration_date = this.createExpirationDate(this.chosenOption);
    console.log(name);
    if(!name){
      alert("Wprowadź nazwę domeny, którą chcesz kupić");
      this.step = 1;
    }else{
      this.postService.savePost({id_user, name, at, ip_address, purchase_date, expiration_date} as Post).subscribe(post => {this.newPost.emit(post);});
    }
  }
  constructor(private subdomainService: SubdomainsService, private postService: PostService){}

  hideAvailabilityAndPattern(){
    this.showAvailability = false;
    this.wrongPattern = false;
  }
  

  checkAvailability(query:string){
    if(query == ''){
      alert("Wprowadź nazwę, która cię interesuje!");
      return;
    }else{
      var pattern = new RegExp('^[a-zA-Z0-9-]+$');
      if(!pattern.test(query + '')){
        this.wrongPattern = true;
        return;
      }
      this.availability = true;
      for(var q=0; q<this.subdomains.length; q++){
        if(this.subdomains[q].name==query){
          this.availability = false;
          break;
        }
      }
    this.showAvailability = true;
    }
  }

  
  checkAvailabilityAndProceed(query:string){
    this.subdomainToPurchase = query;
    this.availability = true;
    for(var q=0; q<this.subdomains.length; q++){
      if(this.subdomains[q].name==query){
        this.availability = false;
        this.showAvailability = true;
        return;
      }
    }
    this.showAvailability = true;
    this.step = 2;
  }

  offerChoice(num){
    this.chosenOption = num;
    console.log(this.chosenOption);
    console.log(this.subdomainToPurchase);
  }

  checkOfferChoice(){
    if(this.chosenOption < 1){
      alert("Wybierz długość abonamentu");
    }else{
      this.step = 3;
    }
  }

  step:number; 
  query:string;

  domainToPurchase(query){
    console.log(query);
    this.query = query;
  }

  domainPattern(query:string){
    var pattern = new RegExp('^[a-zA-Z0-9-]+$');
    if(query == ''){
      alert("Wprowadź nazwę, która cię interesuje!");
      return;
    }else if(pattern.test(query + '')){
      this.checkAvailabilityAndProceed(query);
      return;
    }else{
      this.wrongPattern = true;
      return;
    }
  }


  createRegistrationDate(){
    var x = new Date;
    var result = x.getFullYear() + '-0' + (x.getMonth()+1) + '-' + x.getDate();
    return result;
  }

  createExpirationDate(option){
    var x = new Date;
    if(option == 1){
    var result = (x.getFullYear()+1) + '-0' + (x.getMonth()+1) + '-' + x.getDate();
    }else if(option == 2){
      var result = (x.getFullYear()+5) + '-0' + (x.getMonth()+1) + '-' + x.getDate();
    }
    return result;
  }

  ngOnInit(){
    this.step = 1;
    this.query='';
    this.chosenOption = 1;
    this.subdomainService.getSubdomains().subscribe(subdomains => {
      this.subdomains = subdomains});    
    this.showAvailability = false;
    this.wrongPattern = false;
  }
   

}
