import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {ConfigService} from '../service/config.service';
import {TCX} from 'ngx-tcx';
export const headerChart = 'HeaderChart';

@Injectable()
export class TcxInterceptor implements HttpInterceptor{
  constructor (
    private tcx : TCX,
    private config : ConfigService
){}


  intercept(req: HttpRequest<any>, next: HttpHandler) {

   if(req.headers && req.headers.has(headerChart)){
     this.tcx.init({
       url : this.config.url.api,
       app_id : 'PUSHADS',
       secret_key : 'ae2d6c109b7abe73e40e42141162890d',
       public_key : '2cb103f199778f095fe485e621c55d61',
       auth : 'none', // available param, time and none.
       master_key : 'de61dd5bde3c8f5509887bbeb3caf33732bb0c7e'
     });
   }else{
     this.tcx.init({
       url : this.config.url.api,
       app_id : 'ads_dashboard',
       secret_key : 'ba8672172f8c3c680553644dc318b7ed',
       public_key : '1bf6a3e20185932d7cf07fbc2679f45b',
       auth : 'time', // available param, time and none.
       master_key : '3ec6f0483cfae9bb294a39338586578ea6ac09af'
     });
   }

    const time = TCX.getTime();
    let secureReq = req.clone( {
      headers: req.headers
        .set('X-TCX-TYPE', 'FTC')
        .set('X-TCX-APP-ID', this.tcx.getAppID())
        .set('X-TCX-APP-PASS', this.tcx.getAppPass( {'tcx_datetime': time}))
        .set('X-TCX-TOKEN', this.tcx.getMasterToken()),
       params: req.params.append('tcx_datetime', time)
    });
    return next.handle(secureReq);
  }
}
