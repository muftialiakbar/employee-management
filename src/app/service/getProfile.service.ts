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

  // noinspection JSAnnotator
  getProfile(): Observable<ResponseInterface<ProfileInterface[]>> {
    // noinspection JSAnnotator
    return this.httpClient.get<ResponseInterface<ProfileInterface[]>>(
      this.Config.url.api + 'backend/profile/group',
      {}
    );
  }
}
