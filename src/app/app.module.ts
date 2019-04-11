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
import {ProfileComponent} from './components/profile.component';
import {GetProfileService} from './service/getProfile.service';
import {BsNgxPaginationModule} from 'bs-ngx-pagination';
import {GroupService} from './service/group.service';
import {GroupAccountService} from './service/group.account.service';
import {CategoryService} from './service/category.service';
import {CATEGORY_COMPONENT} from './components/category';
import {ADVERTISEMENT_COMPONENT} from './components/advertisement';
import {AdvertisementImageService} from './service/advertisement.image.service';
import {ADVERTISEMENET_IMAGE_COMPOENENT} from './components/advertisement/image';
import {AdvertisementService} from './service/advertisement.service';
import {ADVERTISEMENT_VIDEO_COMPONENT} from './components/advertisement/video';
import {AdvertisementVideoService} from './service/advertisement.video.service';
import {ImageSizeService} from './service/image.size.service';
import {IMAGE_SIZE_COMPONENT} from './components/image size';
import {VideoSizeService} from './service/video.size.service';
import {VIDEO_SIZE_COMPONENT} from './components/video size';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time.module';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TelkomapsService} from './service/telkomaps.service';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {BsNgxHouratdayPickerModule} from 'bs-ngx-houratday-picker';
import {TCX} from 'verzth-tcx-js-angular/tcx-ng';
import {ChartsModule} from 'ng2-charts';
import {ChartComponent} from './components/chart/chart.component';
import {ChartService} from './service/chart.service';
import {BarchartComponent} from './components/chart/barchart.component';
import {PieChartComponent} from './components/chart/piechart.component';
import {GROUP_COMPONENT} from './components/group';
import {GROUP_ACCOUNT_COMPONENT} from './components/group/group-account';


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
    CATEGORY_COMPONENT,
    ADVERTISEMENT_COMPONENT,
    ADVERTISEMENET_IMAGE_COMPOENENT,
    ADVERTISEMENT_VIDEO_COMPONENT,
    IMAGE_SIZE_COMPONENT,
    VIDEO_SIZE_COMPONENT,
    // TELKOMAPS_COMPONENT,
    ChartComponent,
    BarchartComponent,
    PieChartComponent,
    GROUP_COMPONENT,
    GROUP_ACCOUNT_COMPONENT
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BsNgxPaginationModule,
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
    MatInputModule
  ],
  providers: [
    ConfigService,
    LoginService,
    LogoutService,
    CookieService,
    IndexInterceptor,
    GetProfileService,
    AuthGuard,
    GroupService,
    GroupAccountService,
    CategoryService,
    AdvertisementService,
    AdvertisementImageService,
    AdvertisementVideoService,
    ImageSizeService,
    VideoSizeService,
    TelkomapsService,
    TCX,
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
