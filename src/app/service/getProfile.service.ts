import {Injectable} from '@angular/core';
import {config, Observable} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http'
import {ResponseInterface} from '../interface/response.interface';
import {ProfileInterface} from '../interface/profile.interface';

@Injectable()
export class GetProfileService {
  constructor(
    private Config: ConfigService,
    private httpClient: HttpClient
  ) {}


  /*getProfile(event): Observable<ResponseInterface<any>> {
    return this.http.get<ResponseInterface<any>>(
      this.configService.url.api + 'backend/profile/administrator',
      {params:event}
    );
  }*/


  getProfile(event): Observable<ResponseInterface<any>> {
    return this.httpClient.get<ResponseInterface<any>>(
      this.Config.url.api + 'backend/profile/group',
      {params: event}
    );
  }

  changeProfile(value): Observable<ResponseInterface<ProfileInterface[]>> {
    // noinspection JSAnnotator
    return this.httpClient.post<ResponseInterface<ProfileInterface[]>>(
      this.Config.url.api + 'backend/change/profile/group',
      value
    );
  }

  changePassword(value): Observable<ResponseInterface<any>> {
    return this.httpClient.post<ResponseInterface<any>>(this.Config.url.api + "backend/change/password/group",value);
  }
}
