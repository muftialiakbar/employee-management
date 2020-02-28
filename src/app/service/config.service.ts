import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  constructor () {}

  url = {
    'api' : 'http://192.168.1.89:8092/',
    'image': 'http://192.168.1.130:8800/',

    'chart' : 'https://sa.pushads.amandjaja.com/fig/service/content/'
  };

  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
}
