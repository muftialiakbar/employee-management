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
      this.configService.url.api + 'backend/group/advertisements', {params: event}
    )
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/group/advertisement', {params: {id: id}}
    )
  }

  getDataExcel(event):Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/group/advertisement',
      {params : event}
    )
  }
}
