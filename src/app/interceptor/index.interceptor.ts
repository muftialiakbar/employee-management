import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SessionInterceptor} from './session.interceptor';
import {DeviceIDInterceptor} from './deviceID.interceptor';
import {TcxInterceptor} from './tcx.interceptor';

export const IndexInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DeviceIDInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TcxInterceptor, multi: true }
];
