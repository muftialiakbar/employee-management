import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class AdvertisementVideoService {
  constructor(
    private http:HttpClient,
    private configService: ConfigService
  ){}

  getData(value): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/advertisement/videos',
      {params: value}
    );
  }

  getDataParent(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/advertisement',
      {params: {id: event}}
    );
  }

  getDataSize(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/videosize',
      {params: event}
    );
  }

  getDataID(account_id, id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/advertisement/video',
      {params: {advertisement_id: account_id, id: id}}
    );
  }

  add(data, id){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/advertisement/video', this.configService.getFormData(data));
  }

  delete(data){
      return this.http.post<any>(
        this.configService.url.api + 'backend/user/advertisement/video', {_method: 'delete', id: data}
      );
  }


  edit(data, id){
    data._method = 'put';
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/advertisement/video', this.configService.getFormData(data)
    );
  }

  exist(check, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/user/advertisement/video/exist/' + check, {params : {value: data}}
    );
  }

  image(data){
    return this.configService.url.image + 'data/advertisement/video-image/' + data;
  }
}
