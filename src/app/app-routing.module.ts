import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard.component';
import {OverviewComponent} from './components/home/overview.component';
import {AuthGuard} from './components/auth/auth.guard';
import {ProfileComponent} from './components/profile.component';
import {CategoryComponent} from './components/category/category.component';
import {ViewCategoryComponent} from './components/category/view.category.component';
import {AddCategoryComponent} from './components/category/add.category.component';
import {EditCategoryComponent} from './components/category/edit.category.component';
import {AdvertisementComponent} from './components/advertisement/advertisement.component';
import {ViewAdvertisementComponent} from './components/advertisement/view.advertisement.component';
import {AddAdvertisementComponent} from './components/advertisement/add.advertisement.component';
import {EditAdvertisementComponent} from './components/advertisement/edit.advertisement.component';
import {ViewAdvertisementImageComponent} from './components/advertisement/image/view.advertisement.image.component';
import {AddAdvertisementImageComponent} from './components/advertisement/image/add.advertisement.image.component';
import {EditAdvertisementImageComponent} from './components/advertisement/image/edit.advertisement.image.component';
import {ViewAdvertisementVideoComponent} from './components/advertisement/video/view.advertisement.video.component';
import {AddAdvertisementVideoComponent} from './components/advertisement/video/add.advertisement.video.component';
import {EditAdvertisementVideoComponent} from './components/advertisement/video/edit.advertisement.video.component';
import {ImageSizeComponent} from './components/image size/image.size.component';
import {ViewImageSizeComponent} from './components/image size/view.image.size.component';
import {AddImageSizeComponent} from './components/image size/add.image.size.component';
import {EditImageSizeComponent} from './components/image size/edit.image.size.component';
import {VideoSizeComponent} from './components/video size/video.size.component';
import {ViewVideoSizeComponent} from './components/video size/view.video.size.component';
import {AddVideoSizeComponent} from './components/video size/add.video.size.component';
import {EditVideoSizeComponent} from './components/video size/edit.video.size.component';
import {TelkomapsComponent} from './components/telkomaps/telkomaps.component';
import {ViewTelkomapsComponent} from './components/telkomaps/view.telkomaps.component';
import {AddTelkomapsComponent} from './components/telkomaps/add.telkomaps.component';
import {EditTelkomapsComponent} from './components/telkomaps/edit.telkomaps.component';
import {StatisticsComponent} from './components/advertisement/statistics.component';
import {GroupComponent} from './components/group/group.component';
import {ViewGroupComponent} from './components/group/view.group.component';
import {AddGroupComponent} from './components/group/add.group.component';
import {EditGroupComponent} from './components/group/edit.group.component';
import {AddGroupAccountComponent} from './components/group/group-account/add.group.account.component';
import {ViewGroupAccountComponent} from './components/group/group-account/view.group.account.component';
import {EditGroupAccountComponent} from './components/group/group-account/edit.group.account.component';


const routes: Routes = [
  {
    path : '', component: LoginComponent
  },
  {
    path : 'dashboard', component: DashboardComponent,
    children: [
      {path : '', component: OverviewComponent},
      {path: 'profile', component: ProfileComponent},
      {
        path: 'category', component: CategoryComponent,
        children: [
          {path: '', component: ViewCategoryComponent},
          {path: 'add', component: AddCategoryComponent},
          {path: 'edit/:id', component: EditCategoryComponent}
        ]
      },
      {
        path: 'group', component: GroupComponent,
        children: [
          {path: '', component: ViewGroupComponent},
          {path: 'add', component: AddGroupComponent},
          {path: 'edit/:id', component: EditGroupComponent},
          {
            path: ':pid/account',
            children: [
              {path: '', component: ViewGroupAccountComponent},
              {path: 'add', component: AddGroupAccountComponent},
              {path: 'edit/:id', component: EditGroupAccountComponent},
            ]
          }
        ]
      },
      {
        path: 'advertisement', component: AdvertisementComponent,
        children: [
          {path: '', component: ViewAdvertisementComponent},
          {path: 'add', component: AddAdvertisementComponent},
          {path: 'edit/:id', component: EditAdvertisementComponent},
          {path: 'statistics/:id', component: StatisticsComponent},
          {
            path: ':pid/image',
            children: [
              {path: '', component:ViewAdvertisementImageComponent},
              {path: 'add', component: AddAdvertisementImageComponent},
              {path: 'edit/:id', component: EditAdvertisementImageComponent}
            ]
          },
          {
            path: ':pid/video',
            children: [
              {path: '', component: ViewAdvertisementVideoComponent},
              {path: 'add', component: AddAdvertisementVideoComponent},
              {path: 'edit/:id', component: EditAdvertisementVideoComponent}
            ]
          }
        ]
      },
      {
        path: 'image-size', component: ImageSizeComponent,
        children: [
          {path: '', component: ViewImageSizeComponent},
          {path: 'add', component: AddImageSizeComponent},
          {path: 'edit/:id', component: EditImageSizeComponent}
        ]
      },
      {
        path: 'video-size', component: VideoSizeComponent,
        children: [
          {path: '', component: ViewVideoSizeComponent},
          {path: 'add', component: AddVideoSizeComponent},
          {path: 'edit/:id', component: EditVideoSizeComponent}
        ]
      },
    /*  {
        path: 'telkom-aps', component: TelkomapsComponent,
        children: [
          {path: '', component: ViewTelkomapsComponent},
          {path: 'add', component: AddTelkomapsComponent},
          {path: 'edit/:id', component: EditTelkomapsComponent}
        ]
      },*/
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
