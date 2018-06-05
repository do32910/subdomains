import { Component, OnInit } from '@angular/core';
import { fakeActiveUser } from '../../mockup/mock-activeuser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeUser = fakeActiveUser;

  constructor() { }

  ngOnInit() {
  }

}
