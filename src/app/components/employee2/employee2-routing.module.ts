import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Employee2Component} from './employee2/employee2.component';
import {ViewEmployee2Component} from './view-employee2/view-employee2.component';
import {AddEmployee2Component} from './add-employee2/add-employee2.component';
import {EditEmployee2Component} from './edit-employee2/edit-employee2.component';

const routes: Routes = [
  {
    path : '',
    component : Employee2Component,
    children : [
      {path : '',component : ViewEmployee2Component},
      {path : 'add',component : AddEmployee2Component},
      {path : 'edit/:id',component : EditEmployee2Component}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Employee2RoutingModule { }
