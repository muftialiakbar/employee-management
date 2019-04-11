import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class AdvertisementImageService {
  constructor(
    private http:HttpClient,
    private configService: ConfigService,
  ){}

  getData(value): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/advertisement/images',
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
      this.configService.url.api + 'backend/user/imagesize',
      {params: event}
    );
  }

  getDataID(pid, id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/advertisement/image',
      {params: {advertisement_id: pid, id: id}}
    );
  }

  add(data, id){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/advertisement/image', this.configService.getFormData(data));
  }

  delete(data){
      return this.http.post<any>(
        this.configService.url.api + 'backend/user/advertisement/image',{_method: 'delete', id: data});
  }

  edit(data, id){
    data._method = 'put';
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/advertisement/image', this.configService.getFormData(data)
    );
  }

  exist(check, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/administrator/user/image/exist/' + check, {params : {value: data}}
    );
  }

  image(data){
    return this.configService.url.image + 'data/advertisement/image/' + data;
  }
}
