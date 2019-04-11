import {Component, OnInit} from '@angular/core';
import {ImageSizeService} from '../../service/image.size.service';
import {ImageSizeInterface} from '../../interface/image.size.interface';

@Component({
  templateUrl: './view.image.size.component.html'
})

export class ViewImageSizeComponent implements OnInit{
  public datas: ImageSizeInterface[] = [];
  public dataPage: any = {};
  public list: ImageSizeInterface = [] as any;
  public dataAdd = <any> {};
  public page: number = 1;

  constructor(private service: ImageSizeService) {}

  ngOnInit() {
    this.service.getData({})
      .subscribe( res => {
        this.datas = res.data;
        this.dataPage = res.data;
      })
  }

  /*getID(id){
    return this.service.getDataID(id)
      .subscribe( res => {
        this.list = res.data;
      });
  }*/

 /* allChecked(event){
    this.datas.forEach( x => x.dataChecked = event.target.checked);
  }*/

 /* get selectedDelete(){
    return this.datas
      .filter( opt => opt.dataChecked)
      .map(res=> res.id);
  }*/

 /* delete(){
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

 /* pageChange(page) {
    this.page = page;
    this.service.getData(page)
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
      });
  }*/
}
