import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard.component';
import {OverviewComponent} from './components/home/overview.component';
import {AuthGuard} from './components/auth/auth.guard';
import {ProfileComponent} from './components/profile/profile.component';
import {AdvertisementComponent} from './components/advertisement/advertisement.component';
import {ViewAdvertisementComponent} from './components/advertisement/view.advertisement.component';
import {StatisticsComponent} from './components/advertisement/statistics.component';
import {ProfileChangeComponent} from './components/profile/profile.change.component';
import {ChangePasswordComponent} from './components/profile/change-password.component';


const routes: Routes = [
  {
    path : '', component: LoginComponent
  },
  {
    path : 'dashboard', component: DashboardComponent,
    children: [
      {path : '', component: OverviewComponent},
      {path: 'profile',
        children: [
          {path : '', component: ProfileComponent},
          {path : 'change', component: ProfileChangeComponent}
        ]},
      { path : 'change-password', component: ChangePasswordComponent},
      {
        path: 'advertisement', component: AdvertisementComponent,
        children: [
          {path: '', component: ViewAdvertisementComponent},
          {path: 'statistics/:id', component: StatisticsComponent},
        ]
      },
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
