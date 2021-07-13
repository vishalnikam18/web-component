import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardInterviewerComponent } from './dashboard-interviewer/dashboard-interviewer.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard-interviewer', component: DashboardInterviewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
