import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fakeActiveUser } from '../mockup/mock-activeuser';



@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http:HttpClient
  ) { 
}
  activeUser = fakeActiveUser;

  private userDomainsUrl = 'http://flask-env.gepn8fd8hx.eu-central-1.elasticbeanstalk.com/users/' + this.activeUser.id;

  getUserData(): Observable<User[]> {
    return this.http.get<User[]>(this.userDomainsUrl);
  }
  
}
