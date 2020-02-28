import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class ApplicationService{
  constructor(
    private http : HttpClient,
    private configService: ConfigService
  ){}

  getData(data): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application', {params: data}
    )
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application', {params: {id: id}}
    )
  }

  getDataIDTrash(data): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'application', {params: data}
    )
  }


  add(data){
    return this.http.post<any>(
      this.configService.url.api + 'application', data);
  }

  edit(id,data){
    return this.http.put<any>(
      this.configService.url.api + 'application/'+ id, data)
  }

  delete(id){
    return this.http.delete<any>(
      this.configService.url.api + 'application/'+ id
    );
  }

  deletePermanent(id){
    return this.http.delete<any>(
      this.configService.url.api + 'application/'+ id+ '/permanent'
    );
  }

  activate(id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+id+'/activate',{}
    );
  }

  deactivate(id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+id+'/deactivate',{}
    );
  }

  restore(id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+id+'/restore',{}
    );
  }

  suspend(id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+id+'/suspend',{}
    );
  }

  unsuspend(id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+id+'/unsuspend',{}
    );
  }

  regenerateKey(id){
    return this.http.patch<any>(
      this.configService.url.api + 'application/'+id+'/regenerate',{}
    );
  }
}
