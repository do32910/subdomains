import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserDataService } from '../../services/user-data.service';
import { fakeActiveUser } from '../../mockup/mock-activeuser';
import { PostService } from '../../services/post.service';
import { last } from 'rxjs/operators';
import { UserDataEditPUT } from '../../models/UserDataEditPUT';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css']
})
export class UserDataFormComponent implements OnInit {

  constructor(private userDataService: UserDataService, private postService: PostService) { }

  userData:User[];
  dataToPUT:UserDataEditPUT;

  ngOnInit() {
    this.userDataService.getUserData().subscribe(userData => {
      this.userData = userData;
    });
  }
  editUserData(firstName:string){
    this.postService.editUserData({columns: ["\'"+ 'email' + "\'"], values: ["\'"+ firstName + "\'"]} as UserDataEditPUT).subscribe(dataToPUT => console.log(dataToPUT));
  }
}
