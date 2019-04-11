import {AdvertisementInterface} from './advertisement.interface';
import {VideoSizeInterface} from './video.size.interface';

export interface AdvertisementVideoInterface {
  'id': number,
  'link': string,
  'link_mp4': string,
  'link_webm': string,
  'link_ogv': string,
  'video_size_id': number,
  'isForce': number,
  '_min': number,
  'action': string,
  'created_at': string,
  'updated_at': string,
  'dataChecked': boolean,
  'advertisement': AdvertisementInterface,
  'advertisement_id': number,
  'email' : string,
  'image' : any,
  'video_size': VideoSizeInterface
}
