import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/response.interface';

@Injectable()
export class EmployeeService{
  constructor(
    private http : HttpClient,
  ){}

  getData(data): Observable<ResponseInterface<any>>{
   return this.http.get<ResponseInterface<any>>(
      'http://localhost:5555/data', {params: data}
   )
 }

  add(data){
    return this.http.post<any>(
      'http://localhost:5555/data', data);
  }

  delete(id){
    return this.http.delete<any>(
      "http://localhost:5555/data/" +id, {params: {id:id}}
    );
  }

  edit(data){
    return this.http.put<any>(
      "http://localhost:5555/data/" +data.id, data
    );
  }

  getDataID(id): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(
      "http://localhost:5555/data/" +id, {params: {id: id}}
    )
  }
}
