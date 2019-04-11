import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class ImageSizeService{
  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}

  getData(event): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/imagesize', {params: {page: event}}
    )
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/administrator/size/image', {params: {id: id}}
    )
  }

  add(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/administrator/size/image', data);
  }

  delete(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/administrator/size/image', {_method:'delete', id: data}
    )
  }

  edit(data){
    data._method = 'put';
    return this.http.post<any>(
      this.configService.url.api + 'backend/administrator/size/image', this.configService.getFormData(data)
    )
  }

  exist(field, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/administrator/size/image/exist/' + field, {params : data}
    )
  }
}
