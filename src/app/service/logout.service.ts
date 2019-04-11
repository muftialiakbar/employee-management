import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import *as moment from 'moment';
import {ConfigService} from './config.service';
import Swal from 'sweetalert2';


@Injectable()
export class LogoutService {
  constructor(
    private httpClient: HttpClient,
    private Cookies: CookieService,
    private router: Router,
    private Config: ConfigService) {}

  getlogout() {
    return this.httpClient.post<any>(
      this.Config.url.api + 'backend/logout/account',
      {})
      .subscribe(res => {
          this.Cookies.delete('pushads_session','/');
          this.router.navigate(['/']);
      });
      /*.subscribe(  res => console.log(res), error => console.log(error));*/
  }
}
