import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor{



  intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {

    /*var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append("Authorization", "Basic " + btoa("ac7917c31072d0422e84071ee315ac7011af1ce3:02aa2da6f209e100cbe2e0591bce88d49e5e4ac1"));

    const httpOptions = {
      headers: headers_object
    };*/


    const secureReq = req.clone( {
      headers: req.headers.set('Authorization', "Basic " + btoa("ac7917c31072d0422e84071ee315ac7011af1ce3:02aa2da6f209e100cbe2e0591bce88d49e5e4ac1"))
    });
    return next.handle(secureReq);
  }
}
