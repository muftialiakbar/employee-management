import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class AdvertisementService{
  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}

  getData(event): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/advertisements', {params: event}
    )
  }

  getDataAccount(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/accounts',
      {params: event}
    );
  }


  getDataAps(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/telkomap',
      {params: event}
    );
  }

  getDataKota(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/telkomap/kota',
      {params: event}
    );
  }

  getDataWitel(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/telkomap/witel',
      {params: event}
    );
  }

  getDataRegional(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/telkomap/regional',
      {params: event}
    );
  }

  getDataGroup(id): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/groups',
      {params: id}
    );
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/advertisement', {params: {id: id}}
    )
  }

  add(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/advertisement', data)
  }

  delete(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/advertisement',
      {_method:'delete', id: data}
    );
  }

  edit(data){
    return this.http.put<any>(
      this.configService.url.api + 'backend/user/advertisement', data)
  }

  exist(field, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/user/advertisement/exist/' + field, {params : data}
    )
  }
}
