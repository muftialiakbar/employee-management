import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class ApplicationHostService{
  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}

  getData(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application/'+id+'/host'
    )
  }

  getDataTrash(id,trashed): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application/'+id+'/host', {params: {trashed: trashed}}
    )
  }

  getDataID(pid,id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application/'+pid+'/host', {params: {id: id}}
    )
  }

  getDataExcel(event):Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/group/advertisement',
      {params : event}
    )
  }

  add(id,data){
    return this.http.post<any>(
      this.configService.url.api + 'application/'+id+'/host', data);
  }

  edit(pid,data, id){
    return this.http.put<any>(
      this.configService.url.api + 'application/'+ pid+ '/host/' + id, data)
  }


  activate(pid,id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+pid+'/host/' + id+ '/activate',{}
    );
  }

  deactivate(pid,id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+pid+'/host/'+id+'/deactivate',{}
    );
  }


  delete(pid,id){
    return this.http.delete<any>(
      this.configService.url.api + 'application/'+ pid + '/host/' + id
    );
  }

  deletePermanent(pid,id){
    return this.http.delete<any>(
      this.configService.url.api + 'application/'+ pid+ '/host/' + id+ '/permanent'
    );
  }

  restore(pid,id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+pid+'/host/'+id+'/restore',{}
    );
  }

  suspend(pid,id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+pid+'/host/' +id+'/suspend',{}
    );
  }

  unsuspend(pid,id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+pid+'/host/' +id+'/unsuspend',{}
    );
  }
}
