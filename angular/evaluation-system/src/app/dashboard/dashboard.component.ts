import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  role : string = '';
  email : string = '';
  name : string= '';
  constructor(private service : AppService) 
  {
    this.service.getUserDetails().subscribe(data => {
      this.role = data.role;
      this.email = data.email;
      this.name = data.name;

    })
   }
  ngOnInit() {
  }

}
