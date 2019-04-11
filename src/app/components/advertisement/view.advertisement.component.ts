import {Component} from '@angular/core';
import {AdvertisementService} from '../../service/advertisement.service';
import {AdvertisementInterface} from '../../interface/advertisement.interface';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';

@Component({
  templateUrl: './view.advertisement.component.html'
})

export class ViewAdvertisementComponent {
  public datas: AdvertisementInterface[] = [];
  public dataPage: any = {};
  public list: AdvertisementInterface = [] as any;
  public page: number = 1;
  public searchKey: FormControl = new FormControl();

  constructor(private service : AdvertisementService) {}

  ngOnInit(){
    this.service.getData({page: this.page})
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });


    this.searchKey.valueChanges
      .pipe(
        debounceTime(1000),
        filter(search => !!search),
        map(search => {
        }),
        // delay(500)
      )
      .subscribe(res =>
      {
        this.service.getData({'keys' : 'name', 'keyword': this.searchKey.value})
          .subscribe( key => {
            this.datas = key.data.data;
            this.dataPage = key.data;
          })
      });
  }

  getID(id){
    return this.service.getDataID(id)
      .subscribe( res => {
        this.list = res.data;
      });
  }

  pageChange(page) {
    this.page = page;
    this.service.getData({page:page})
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });
  }

  search(event){
    if(event.key == 'Enter'){
        this.service.getData({'keys' : 'name', 'keyword': this.searchKey.value})
          .subscribe( key => {
            this.datas = key.data.data;
            this.dataPage = key.data;
          });
    }
  }
}
