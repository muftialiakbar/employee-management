import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import {UserComponent} from './components/user.component';
import {DashboardComponent} from './components/dashboard.component';
import {HeaderComponent} from './components/header.component';
import {NavbarComponent} from './components/navbar.component';
import {RightSidebarComponent} from './components/right-sidebar.component';
import {OverviewComponent} from './components/home/overview.component';
import {StatsComponent} from './components/stats.component';
import {SimpleTableComponent} from './components/simple-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './service/login.service';
import {CookieService} from 'ngx-cookie-service';
import {IndexInterceptor} from './interceptor/index.interceptor';
import {HttpModule} from '@angular/http';
import {LogoutService} from './service/logout.service';
import {AuthGuard} from './components/auth/auth.guard';
import {ConfigService} from './service/config.service';
import {ProfileComponent} from './components/profile/profile.component';
import {GetProfileService} from './service/getProfile.service';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {BsNgxHouratdayPickerModule} from 'bs-ngx-houratday-picker';
import {ChartsModule} from 'ng2-charts';
import {ChartComponent} from './components/chart/chart.component';
import {ChartService} from './service/chart.service';
import {BarchartComponent} from './components/chart/barchart.component';
import {PieChartComponent} from './components/chart/piechart.component';
import {ProfileChangeComponent} from './components/profile/profile.change.component';
import {ChangePasswordComponent} from './components/profile/change-password.component';
import {TCX} from 'ngx-tcx';
import {NgxBootstrapPaginationModule} from '@verzth/ngx-bootstrap-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    UserComponent,
    NavbarComponent,
    RightSidebarComponent,
    OverviewComponent,
    StatsComponent,
    SimpleTableComponent,
    ProfileComponent,
    ProfileChangeComponent,
    ChangePasswordComponent,
    ChartComponent,
    BarchartComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxBootstrapPaginationModule,
    CKEditorModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    OwlMomentDateTimeModule,
    OwlDateTimeModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    BsNgxHouratdayPickerModule,
    ChartsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    ConfigService,
    LoginService,
    LogoutService,
    CookieService,
    IndexInterceptor,
    GetProfileService,
    // AuthGuard,
    TCX,
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
