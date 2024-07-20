import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"people/:id",
    component:PeopleDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
