import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdvertisementImageService} from '../../../service/advertisement.image.service';
import Swal from "sweetalert2";
import {AdvertisementImageInterface} from '../../../interface/advertisement.image.interface';

@Component({
  templateUrl: './view.advertisement.image.component.html'
})

export class ViewAdvertisementImageComponent implements OnInit{
  public datas: AdvertisementImageInterface[] = [];
  public pDatas : AdvertisementImageInterface = [] as any;
  public dataPage: any = {};
  public list: AdvertisementImageInterface = [] as any;
  public pid: number;
  public page: number = 1;

  constructor(
    private service: AdvertisementImageService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(
      params => {
        this.pid = +params['pid'];
      }
    );

    this.service.getData({advertisement_id:this.pid})
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });

    this.service.getDataParent(this.pid)
      .subscribe( res => {
        this.pDatas = res.data;
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
    this.service.getData({advertisement_id: this.pid, page:page})
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });
  }

  img(data){
    return this.service.image(data);
  }
}
