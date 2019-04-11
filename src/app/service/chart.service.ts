import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';
import {ProfileInterface} from '../interface/profile.interface';

@Injectable()
export class ChartService {
  constructor(
    private http:HttpClient,
    private configService: ConfigService,
  ){}

  getData(time,event): Observable<ResponseInterface<any>> {
    return this.http.post<ResponseInterface<any>>(
      this.configService.url.chart+ time,event, {headers : {HeaderChart: ''}}
    )
  }

  getDataBar(time,event): Observable<ResponseInterface<any>> {
    return this.http.post<ResponseInterface<any>>(
      this.configService.url.chart+ time,event, {headers : {HeaderChart: ''}}
    )
  }

  getDataMerge(time,event): Observable<ResponseInterface<any>> {
    return this.http.post<ResponseInterface<any>>(
      this.configService.url.chart+ time,event, {headers : {HeaderChart: ''}}
    )
  }

  getDataTable(time,event): Observable<ResponseInterface<any>> {
    return this.http.post<ResponseInterface<any>>(
      this.configService.url.chart+ time,event, {headers : {HeaderChart: ''}}
    )
  }

  getProfile(): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/profile/account',
      {}
    );
  }
}
