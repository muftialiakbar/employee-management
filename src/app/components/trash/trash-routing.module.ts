import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrashComponent} from './trash/trash.component';
import {ViewTrashApplicationComponent} from './view-trash-application/view-trash-application.component';
import {ViewTrashHostComponent} from './view-trash-application/trash-host/view-trash-host/view-trash-host.component';
import {ViewTrashKeyComponent} from './view-trash-application/trash-key/view-trash-key/view-trash-key.component';

const routes: Routes = [
  {
    path : '',
    component: TrashComponent,
    children : [
      {path : '',component: ViewTrashApplicationComponent},
      {
        path : ':pid/host',
        children: [
          {path : '', component: ViewTrashHostComponent}
        ]
      },
      {
        path : ':pid/key',
        children: [
          {path : '', component: ViewTrashKeyComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrashRoutingModule { }
