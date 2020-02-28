import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { ApplicationComponent } from './application/application.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatButtonModule, MatInputModule, MatSelectModule} from '@angular/material';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxBootstrapPaginationModule} from '@verzth/ngx-bootstrap-pagination';
import {ApplicationService} from '../../service/application.service';
import {IndexInterceptor} from '../../interceptor/index.interceptor';
import {ViewApplicationHostComponent} from './application-host/view-application-host/view-application-host.component';
import {ApplicationHostService} from '../../service/application-host.service';
import {ApplicationKeyService} from '../../service/application-key.service';
import {ViewApplicationKeyComponent} from './application-key/view-application-key/view-application-key.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AddHostComponent } from './application-host/add-host/add-host.component';
import { EditHostComponent } from './application-host/edit-host/edit-host.component';
import { EditKeyComponent } from './application-key/edit-key/edit-key.component';
import { AddKeyComponent } from './application-key/add-key/add-key.component';

@NgModule({
  declarations: [ViewApplicationComponent, ApplicationComponent, ViewApplicationHostComponent,ViewApplicationKeyComponent, AddComponent, EditComponent, AddHostComponent, EditHostComponent, EditKeyComponent, AddKeyComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    NgxBootstrapPaginationModule,
    MatInputModule,
    MatButtonModule
  ],
  providers : [
    ApplicationService,
    ApplicationHostService,
    ApplicationKeyService,
    IndexInterceptor
  ]
})
export class ApplicationModule { }
