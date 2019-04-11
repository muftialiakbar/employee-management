import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable()
export class DeviceIDInterceptor implements HttpInterceptor{
  constructor (private Cookies: CookieService ){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.Cookies.check('pushads_deviceID')){
      this.Cookies.set('pushads_deviceID', this.makeid(), moment().add(10, 'year').toDate());
    }
    const secureReq = req.clone( {
      headers: req.headers.set('X-DEVICE-ID', this.Cookies.get('pushads_deviceID'))
    });

    return next.handle(secureReq);
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for ( var i = 0; i < 32; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
