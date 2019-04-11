import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import Swal from "sweetalert2";
import {CategoryInterface} from '../../interface/category.interface';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';

@Component({
  templateUrl: './view.category.component.html'
})

export class ViewCategoryComponent implements OnInit{
  public datas: CategoryInterface[] = [];
  public dataPage: any = {};
  public list: CategoryInterface = [] as any;
  public page: number = 1;
  public searchKey: FormControl = new FormControl();

  constructor(private service: CategoryService) {}

  ngOnInit(){
    this.service.getData({page: this.page})
      .subscribe( res => {
        this.datas = res.data;

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
            this.datas = key.data;
            // this.dataPage = key.data;
          })
      });
  }



/*  getID(id){
    return this.service.getDataID(id)
      .subscribe( res => {
        this.list = res.data;
      });
  }*/

  /*get selectedDelete(){
    return this.datas
      .filter( opt => opt.dataChecked)
      .map(res=> res.id);
  }*/

  /*allChecked(event){
    this.datas.forEach( x => x.dataChecked = event.target.checked);
  }*/

  /*delete(){
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
          /!*console.log('kosong');*!/
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
  }*/

  pageChange(page) {
    this.page = page;
    this.service.getData({page: page})
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });
  }

  icon(data){
    return this.service.icon(data);
  }

  banner(data){
    return this.service.banner(data);
  }

  search(event){
    if(event.key == 'Enter'){
      this.service.getData({'keys' : 'name', 'keyword': this.searchKey.value})
        .subscribe( key => {
          this.datas = key.data;
          // this.dataPage = key.data;
        });
    }
  }
}
