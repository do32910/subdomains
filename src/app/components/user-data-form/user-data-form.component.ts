import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserDataService } from '../../services/user-data.service';
import { fakeActiveUser } from '../../mockup/mock-activeuser';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css']
})
export class UserDataFormComponent implements OnInit {

  constructor(private userDataService: UserDataService) { }

  userData:User[];
  ngOnInit() {
    this.userDataService.getUserData().subscribe(userData => {
      this.userData = userData;
    });
  }
  editUserData(firstName, lastName){
    
  }

}
