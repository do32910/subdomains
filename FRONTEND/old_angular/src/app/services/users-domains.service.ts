import { Injectable } from '@angular/core';
import { UsersDomain } from '../models/UsersDomain';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { fakeActiveUser } from '../mockup/mock-activeuser';

@Injectable({
  providedIn: 'root'
})
export class UsersDomainsService {

  constructor(
    private http:HttpClient
  ) { }

  activeUser = fakeActiveUser;

  public userDomainsUrl = 'http://api-dev.yfqrqedkkf.eu-central-1.elasticbeanstalk.com/users/' + this.activeUser.id + '/subdomains/';
  getUsersDomains(): Observable<UsersDomain[]> {
    return this.http.get<UsersDomain[]>(this.userDomainsUrl);
  }
}
