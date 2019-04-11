import {AdvertisementInterface} from './advertisement.interface';
import {ImageSizeInterface} from './image.size.interface';

export interface AdvertisementImageInterface {
  'id': number,
  'advertisement_id': number,
  'image_size_id': number,
  'link': string,
  'isForce': number,
  '_min': number,
  'action': string,
  'created_at': string,
  'updated_at': string,
  'dataChecked': boolean,
  'image': any,
  'advertisement': AdvertisementInterface,
  'image_size': ImageSizeInterface
}
