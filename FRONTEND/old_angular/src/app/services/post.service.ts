import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { UsersDomainsService } from '../services/users-domains.service';
import { UserDataEditPUT } from '../models/UserDataEditPUT';

const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'}) }

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl: string = 'http://api-dev.yfqrqedkkf.eu-central-1.elasticbeanstalk.com/subdomains/';
  constructor(private http: HttpClient, private usersdomainsservice: UsersDomainsService) { }

  getPosts() : Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl);
  }

  savePost(post: Post):Observable<Post>{
    return this.http.post<Post>(this.postsUrl, post, httpOptions);
  }


  tempUrl = 'http://api-dev.yfqrqedkkf.eu-central-1.elasticbeanstalk.com/users/3';
  editUserData(dataToPUT: UserDataEditPUT): Observable<UserDataEditPUT>{
    alert(dataToPUT.values)
    alert(dataToPUT.columns);
    // return this.http.put<UserDataEditPUT>(this.usersdomainsservice.userDomainsUrl, dataToPUT, httpOptions);
    return this.http.put<UserDataEditPUT>(this.tempUrl, dataToPUT, httpOptions);
  }
}
