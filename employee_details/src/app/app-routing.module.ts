import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployedetailComponent } from './components/employedetail/employedetail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'employee', component: EmployedetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
