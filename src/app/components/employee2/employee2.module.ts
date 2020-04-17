import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Employee2RoutingModule } from './employee2-routing.module';
import { Employee2Component } from './employee2/employee2.component';
import { ViewEmployee2Component } from './view-employee2/view-employee2.component';
import { AddEmployee2Component } from './add-employee2/add-employee2.component';
import { EditEmployee2Component } from './edit-employee2/edit-employee2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatSelectModule} from '@angular/material';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import {NgxBootstrapPaginationModule} from '@verzth/ngx-bootstrap-pagination';
import {EmployeeService} from '../../service/Employee.service';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [Employee2Component, ViewEmployee2Component, AddEmployee2Component, EditEmployee2Component],
  imports: [
    CommonModule,
    Employee2RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    NgxBootstrapPaginationModule,
    MatInputModule,
    MatButtonModule,
    CKEditorModule
  ],
  providers: [
    EmployeeService
  ]
})
export class Employee2Module { }
