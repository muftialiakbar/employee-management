import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor (
    private Cookies: CookieService,
    private router: Router
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    if (!this.Cookies.check('pushads_session')) {
      this.router.navigate(['/']);
      // return next.handle(req);
    }
    const secureReq = req.clone( {
      headers: req.headers.set('X-SESSION-ID', this.Cookies.get('pushads_session'))
    });
    return next.handle(secureReq);
  }

}
