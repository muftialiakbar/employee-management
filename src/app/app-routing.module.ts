import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileChangeComponent} from './components/profile/profile.change.component';
import {ChangePasswordComponent} from './components/profile/change-password.component';


const routes: Routes = [
  {
    path : '', component: DashboardComponent,
    children: [
      {
        path : '',
        loadChildren: './components/application/application.module#ApplicationModule'
      },
      {
        path: 'trash',
        loadChildren: './components/trash/trash.module#TrashModule'
      },
      {path: 'profile',
        children: [
          {path : '', component: ProfileComponent},
          {path : 'change', component: ProfileChangeComponent}
        ]},
      { path : 'change-password', component: ChangePasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

