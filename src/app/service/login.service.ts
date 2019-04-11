import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ConfigService} from './config.service';


@Injectable()
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private Cookies: CookieService,
    private router: Router,
    private Config: ConfigService) {}

  login(data) {
    return this.httpClient.post<any>(
      this.Config.url.api + 'backend/login/group',
      data);
     /* .subscribe(  res => console.log(res), error => console.log(error));*/
  }
}
