import { Component, OnInit } from '@angular/core';
import { UsersDomainsService } from '../../services/users-domains.service';
import { UsersDomain } from '../../models/UsersDomain';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.css']
})

export class DomainListComponent implements OnInit {

  usersDomains:UsersDomain[];
  isActive:boolean;
  
  constructor(private usersDomainsService: UsersDomainsService) { }

  ngOnInit() {
    this.usersDomainsService.getUsersDomains().subscribe(usersDomains => {
      this.usersDomains = usersDomains;
      if(usersDomains[status]=="ACTIVE"){
        this.isActive=true;
      }else{
        this.isActive=false;
      }
    });

  }

}
