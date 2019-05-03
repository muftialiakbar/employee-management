import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  constructor () {}

  url = {
    'api' : 'http://api.pushads.amandjaja.com/frog/',
    'image': 'http://api.pushads.amandjaja.com/',

    // 'api' : 'http://192.168.1.89:8800/frog/',
    // 'image': 'http://192.168.1.89:8800/'

    // 'api' : 'http://192.168.1.36:9000/frog/',
    // 'image': 'http://192.168.1.36:9000/',
    'chart' : 'http://sa.pushads.amandjaja.com/elderberry/service/content/'
  };

  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
}
