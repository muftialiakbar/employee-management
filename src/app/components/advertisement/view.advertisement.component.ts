import {Component} from '@angular/core';
import {AdvertisementService} from '../../service/advertisement.service';
import Swal from "sweetalert2";
import {AdvertisementInterface} from '../../interface/advertisement.interface';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';

@Component({
  templateUrl: './view.advertisement.component.html'
})

export class ViewAdvertisementComponent {
  public datas: AdvertisementInterface[] = [];
  public dataSearch: AdvertisementInterface[] = [];
  public dataPage: any = {};
  public list: AdvertisementInterface = [] as any;
  public page: number = 1;
  public dataAps =  [];
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

  get selectedDelete(){
    return this.datas
      .filter( opt => opt.dataChecked)
      .map(res=> res.id);
  }

  allChecked(event){
    this.datas.forEach( x => x.dataChecked = event.target.checked);
  }

  delete(){
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        if (!this.selectedDelete[0]) {
          /*console.log('kosong');*/
          Swal(
            'Oops...',
            'data not selected!',
            'error'
          );
        } else {
            this.service.delete(this.selectedDelete)
                .subscribe(res => {
                    if (res.status === 1) {
                      Swal({
                        title: 'Delete',
                        text: 'Your file has been deleted',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'OK'
                      }).then((hasil) => {
                        if (hasil.value) {
                          this.pageChange(this.page);
                        }
                      });
                    } else {
                      Swal(
                        'Oops...',
                        res.status_message,
                        'error'
                      );
                }
            },
            error => console.log(error)
          );
        }
      }
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
