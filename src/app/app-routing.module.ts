import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login.component';


const routes: Routes = [
  {
    path : '',component : LoginComponent
  },
  {
    path : 'home2',
    loadChildren: './components/employee2/employee2.module#Employee2Module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

