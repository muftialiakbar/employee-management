import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {TelkomapsInterface} from '../../interface/telkomaps.interface';
import {TelkomapsService} from '../../service/telkomaps.service';
import {debounceTime, filter, map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: './view.telkomaps.component.html'
})

export class ViewTelkomapsComponent implements OnInit{
  public datas: TelkomapsInterface[] = [];
  public dataPage: any = {};
  public list: TelkomapsInterface = [] as any;
  public dataAdd = <any> {};
  public page: number = 1;
  public searchKey: FormControl = new FormControl();

  constructor(private service: TelkomapsService) {}

  ngOnInit() {
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
        this.service.getData({'keys' : 'ap_name', 'keyword': this.searchKey.value})
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

  allChecked(event){
    this.datas.forEach( x => x.dataChecked = event.target.checked);
  }

  get selectedDelete(){
    return this.datas
      .filter( opt => opt.dataChecked)
      .map(res=> res.id);
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
    this.service.getData({page: this.page})
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });
  }

  search(event){
    if(event.key == 'Enter'){
      this.service.getData({'keys' : 'ap_name', 'keyword': this.searchKey.value})
        .subscribe( key => {
          this.datas = key.data.data;
          this.dataPage = key.data;
        });
    }
  }
}
