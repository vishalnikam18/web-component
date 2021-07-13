import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
@Component({
  selector: 'app-dashboard-interviewer',
  templateUrl: './dashboard-interviewer.component.html',
  styleUrls: ['./dashboard-interviewer.component.scss']
})
export class DashboardInterviewerComponent implements OnInit {
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
