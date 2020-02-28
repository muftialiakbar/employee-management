import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class ApplicationKeyService{
  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}

  getData(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application/'+id+'/key'
    )
  }

  getDataTrash(id,trashed): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application/'+id+'/key', {params: {trashed: trashed}}
    )
  }

  getDataID(pid,id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application/'+pid+'/key', {params: {id: id}}
    )
  }

  add(id,data){
    return this.http.post<any>(
      this.configService.url.api + 'application/'+id+'/key', data);
  }

  activate(pid,id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+pid+'/key/' + id+ '/activate',{}
    );
  }

  deactivate(pid,id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+pid+'/key/'+id+'/deactivate',{}
    );
  }


  delete(pid,id){
    return this.http.delete<any>(
      this.configService.url.api + 'application/'+ pid + '/key/' + id
    );
  }
}
