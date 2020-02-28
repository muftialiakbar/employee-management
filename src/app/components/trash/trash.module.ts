import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrashRoutingModule } from './trash-routing.module';
import { TrashComponent } from './trash/trash.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatSelectModule} from '@angular/material';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import {NgxBootstrapPaginationModule} from '@verzth/ngx-bootstrap-pagination';
import {ApplicationService} from '../../service/application.service';
import {ApplicationKeyService} from '../../service/application-key.service';
import {ApplicationHostService} from '../../service/application-host.service';
import { ViewTrashApplicationComponent } from './view-trash-application/view-trash-application.component';
import { ViewTrashHostComponent } from './view-trash-application/trash-host/view-trash-host/view-trash-host.component';
import { ViewTrashKeyComponent } from './view-trash-application/trash-key/view-trash-key/view-trash-key.component';

@NgModule({
  declarations: [TrashComponent, ViewTrashApplicationComponent, ViewTrashHostComponent, ViewTrashKeyComponent],
  imports: [
    CommonModule,
    TrashRoutingModule,
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
    ApplicationKeyService,
    ApplicationHostService
  ]
})
export class TrashModule { }
