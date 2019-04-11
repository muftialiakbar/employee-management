import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard.component';
import {OverviewComponent} from './components/home/overview.component';
import {AuthGuard} from './components/auth/auth.guard';
import {ProfileComponent} from './components/profile/profile.component';
import {CategoryComponent} from './components/category/category.component';
import {ViewCategoryComponent} from './components/category/view.category.component';
import {AddCategoryComponent} from './components/category/add.category.component';
import {EditCategoryComponent} from './components/category/edit.category.component';
import {AdvertisementComponent} from './components/advertisement/advertisement.component';
import {ViewAdvertisementComponent} from './components/advertisement/view.advertisement.component';
import {ImageSizeComponent} from './components/image size/image.size.component';
import {ViewImageSizeComponent} from './components/image size/view.image.size.component';
import {AddImageSizeComponent} from './components/image size/add.image.size.component';
import {EditImageSizeComponent} from './components/image size/edit.image.size.component';
import {VideoSizeComponent} from './components/video size/video.size.component';
import {ViewVideoSizeComponent} from './components/video size/view.video.size.component';
import {AddVideoSizeComponent} from './components/video size/add.video.size.component';
import {EditVideoSizeComponent} from './components/video size/edit.video.size.component';
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
      // {
      //   path: 'category', component: CategoryComponent,
      //   children: [
      //     {path: '', component: ViewCategoryComponent},
      //     {path: 'add', component: AddCategoryComponent},
      //     {path: 'edit/:id', component: EditCategoryComponent}
      //   ]
      // },
      {
        path: 'advertisement', component: AdvertisementComponent,
        children: [
          {path: '', component: ViewAdvertisementComponent},
          {path: 'statistics/:id', component: StatisticsComponent},
        ]
      },
      // {
      //   path: 'image-size', component: ImageSizeComponent,
      //   children: [
      //     {path: '', component: ViewImageSizeComponent},
      //     {path: 'add', component: AddImageSizeComponent},
      //     {path: 'edit/:id', component: EditImageSizeComponent}
      //   ]
      // },
      // {
      //   path: 'video-size', component: VideoSizeComponent,
      //   children: [
      //     {path: '', component: ViewVideoSizeComponent},
      //     {path: 'add', component: AddVideoSizeComponent},
      //     {path: 'edit/:id', component: EditVideoSizeComponent}
      //   ]
      // },
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
