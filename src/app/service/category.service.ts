import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class CategoryService{
  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}

  getData(event): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/category', {params: event}
    )
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/category', {params: {id: id}}
    )
  }

  add(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/category', this.configService.getFormData(data))
  }

  delete(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/category', {_method:'delete', id: data}
    )
  }

  edit(data){
    data._method = 'put';
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/category', this.configService.getFormData(data)
    )
  }

  exist(field, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/user/category/exist/' + field, {params : data}
    )
  }

  icon(data){
    return this.configService.url.image + 'data/category/icon/' + data;
  }

  banner(data){
    return this.configService.url.image + 'data/category/banner/' + data;
  }
}
