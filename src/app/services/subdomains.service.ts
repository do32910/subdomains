import { Injectable } from '@angular/core';
import { Subdomain } from '../models/Subdomain';
import { SUBDOMAINS } from '../mockup/mock-subdomains';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdomainsService {

  constructor() { }

  getSubdomains(): Observable<Subdomain[]>{
    return of(SUBDOMAINS);
  }
}
