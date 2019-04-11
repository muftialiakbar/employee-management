export interface CategoryInterface {
  'id': number,
  'parent_id': number,
  'name': string,
  'code': string,
  'description': string,
  'image_icon': File,
  'image_banner': File,
  'sort': number,
  'isFeatured': number,
  'isActive': number,
  'dataChecked': boolean,
  'child_on':number
}
