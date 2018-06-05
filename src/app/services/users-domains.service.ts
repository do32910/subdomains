import { Injectable } from '@angular/core';
import { UsersDomain } from '../models/UsersDomain';
import { SUBDOMMOCK } from '../mockup/mock-usrdomains';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDomainsService {

  constructor() { }

  getUsersDomains(): Observable<UsersDomain[]> {
    return of(SUBDOMMOCK);
  }
}
