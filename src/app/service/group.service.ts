import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class GroupService {

  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}


  getData(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/groups',
      {params: event}
    )
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/group',
      {params: {id: id}}
    )
  }

  add(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/group', this.configService.getFormData(data));
  }

  delete(data){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/group',
      {_method:'delete', id: data}
    );
  }

  edit(data){
    data._method = 'put';
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/group', this.configService.getFormData(data));
  }

  exist(field, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/user/group/exist/' + field, {params : data}
    )
  }

  logo(data){
    return this.configService.url.image + 'data/group/logo/' + data;
  }

  banner(data){
    return this.configService.url.image + 'data/group/banner/' + data;
  }
}
