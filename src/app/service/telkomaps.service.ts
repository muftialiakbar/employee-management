import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class TelkomapsService{
  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}

  getData(event): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/administrator/telkomaps', {params: event}
    )
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/administrator/telkomap', {params: {id: id}}
    )
  }

  add(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/administrator/telkomap', data);
  }

  delete(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/administrator/telkomap', {_method:'delete', id: data}
    )
  }

  edit(data){
    data._method = 'put';
    return this.http.post<any>(
      this.configService.url.api + 'backend/administrator/telkomap', this.configService.getFormData(data)
    )
  }

  exist(field, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/administrator/telkomap/exist/' + field, {params : data}
    )
  }
}
