import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationComponent} from './application/application.component';
import {ViewApplicationComponent} from './view-application/view-application.component';
import {ViewApplicationHostComponent} from './application-host/view-application-host/view-application-host.component';
import {ViewApplicationKeyComponent} from './application-key/view-application-key/view-application-key.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {AddHostComponent} from './application-host/add-host/add-host.component';
import {EditHostComponent} from './application-host/edit-host/edit-host.component';
import {AddKeyComponent} from './application-key/add-key/add-key.component';
import {EditKeyComponent} from './application-key/edit-key/edit-key.component';


const routes: Routes = [
  {
    path : '',
    component : ApplicationComponent,
    children : [
      {path : '', component: ViewApplicationComponent},
      {path : 'add', component: AddComponent},
      { path : 'edit/:id' , component: EditComponent},
      {
        path : ':pid/host',
        children : [
          {path : '', component: ViewApplicationHostComponent},
          {path : 'add', component: AddHostComponent},
          {path : 'edit/:id', component: EditHostComponent}
        ]
      },
      {
        path : ':pid/key',
        children : [
          {path: '', component: ViewApplicationKeyComponent},
          {path : 'add', component: AddKeyComponent}
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
