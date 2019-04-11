import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class GroupAccountService {

  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}



  getData(value): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/group/accounts',
      {params: value}
    )
  }

  getDataID(account_id, id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/user/group/account',
      {params: {group_id: account_id, id: id}}
    )
  }

  add(data, id){
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/group/account', data);
  }

  delete(data){
      return this.http.post<any>(
        this.configService.url.api + 'backend/user/group/account',
        {_method:'delete',id: data}
      )
  }

  edit(data, id){
    data._method = 'put';
    return this.http.post<any>(
      this.configService.url.api + 'backend/user/group/account', data);
  }

  exist(field, data){
    return this.http.get<any>(
      this.configService.url.api + 'backend/user/group/account/exist/' + field, {params : data}
    )
  }
}
