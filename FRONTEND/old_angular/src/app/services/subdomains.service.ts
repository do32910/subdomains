import { Injectable } from '@angular/core';
import { Subdomain } from '../models/Subdomain';
import { SUBDOMAINS } from '../mockup/mock-subdomains';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubdomainsService {

  private subdomainsUrl:string = 'http://api-dev.yfqrqedkkf.eu-central-1.elasticbeanstalk.com/subdomains';

  constructor(
    private http:HttpClient) { }

  getSubdomains(): Observable<Subdomain[]>{
    return this.http.get<Subdomain[]>(this.subdomainsUrl);
  }

}
