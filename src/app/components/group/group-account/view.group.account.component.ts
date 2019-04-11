import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import Swal from "sweetalert2";
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';
import {GroupAccountService} from '../../../service/group.account.service';
import {GroupAccountInterface} from '../../../interface/group.account.interface';

@Component({
  templateUrl: './view.group.account.component.html'
})

export class ViewGroupAccountComponent implements OnInit{
  public datas: GroupAccountInterface[] = [];
  public dataPage: any = {};
  public list: GroupAccountInterface = [] as any;
  public pid: number;
  public  ppid: number;
  public page: number = 1;
  public searchKey: FormControl = new FormControl();

  constructor(
    private service: GroupAccountService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.pid = +params['pid'];
        // this.ppid = +params['ppid'];
      }
    );

    this.service.getData({group_id: this.pid})
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
        this.service.getData({'keys': 'email', 'keyword': this.searchKey.value, group_id: this.pid})
          .subscribe( key => {
            this.datas = key.data.data;
            this.dataPage = key.data;
          })
      });
  }

  getID(id){
    this.activatedRoute.params.subscribe(
      params => {
        this.pid = +params['pid'];
      }
    );

    return this.service.getDataID(this.pid, id)
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
    this.service.getData({group_id: this.pid, page:page})
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });
  }

  search(event){
    if(event.key == 'Enter'){
      this.service.getData({'keys': 'email', 'keyword': this.searchKey.value, group_id: this.pid})
        .subscribe( key => {
          this.datas = key.data.data;
          this.dataPage = key.data;
        });
    }
  }
}
