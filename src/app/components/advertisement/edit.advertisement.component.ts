import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdvertisementService} from '../../service/advertisement.service';
import Swal from "sweetalert2";
import {AdvertisementInterface} from '../../interface/advertisement.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';

@Component({
  templateUrl: './edit.advertisement.component.html'
})

export class EditAdvertisementComponent implements OnInit{
  public editList: AdvertisementInterface = {} as AdvertisementInterface;
  public dataDateStart: AdvertisementInterface = {}  as any;
  public dataDateEnd: AdvertisementInterface = {}  as any;
  public id: number;
  public dataAccount = [];
  public dataGroup = [];
  public dataCheckName;
  public dataCheckCode;
  public Editor = ClassicEditor;
  public dataAps = [];
  public dataApsChecked = [];
  public dataKota = [];
  public dataWitel = [];
  public dataRegional = [];
  public apsID = [];
  public searchAps: FormControl = new FormControl();
  public searchKota: FormControl = new FormControl();
  public searchWitel: FormControl = new FormControl();
  public searchAccount: FormControl = new FormControl();
  public searchGroup: FormControl = new FormControl();

  constructor(
    private service: AdvertisementService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.editList.hours = [];
    this.editList.gender = "00";
    this.editList.isNational = 0;
    this.editList.isActive = 0;
    this.editList.isFeatured = 0;
    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

    this.service.getDataID(this.id)
      .subscribe( res => {
        this.editList = res.data;
        this.getDataGroup(this.editList.account_id);
        this.dataDateStart._start = res.data._start;
        this.dataDateEnd._end = res.data._end;
        //convert get data aps
        this.editList.aps.forEach(res => this.apsID.push(res.id));
        this.editList.aps = this.apsID;
      });

  /*  this.service.getDataAccount({limit: 50})
      .subscribe( res => {
        this.dataAccount = res.data.data;
        // this.getDataGroup(this.editList.account_id);
      });*/

    this.service.getDataAps({limit: 50})
      .subscribe( res => {
        this.dataAps = res.data;
      });

    this.service.getDataKota({limit: 50})
      .subscribe( res => {
          this.dataKota = res.data;
          let cachedObject = {};
          this.dataKota.concat(this.editList.kotas).map((item) => cachedObject[item] = item);
          this.dataKota = Object.values(cachedObject);
      });

    this.service.getDataWitel({limit: 50})
      .subscribe( res => {
        this.dataWitel = res.data;
        let cachedObject = {};
        this.dataWitel.concat(this.editList.witels).map((item) => cachedObject[item] = item);
        this.dataWitel = Object.values(cachedObject);
      });

    this.service.getDataRegional({limit: 50})
      .subscribe( res => {
        this.dataRegional = res.data;
      });


    this.searchAps.valueChanges
      .pipe(
        debounceTime(1000),
        filter(search => !!search),
        map(search => {
        }),
        // delay(500)
      )
      .subscribe(res =>
      {
          this.service.getDataAps({limit:50, 'keys' : 'ap_name', 'keyword': this.searchAps.value})
            .subscribe( key => {
              this.dataAps = key.data;
              let cachedObject = {};
              this.dataAps.concat(this.dataApsChecked).map((item) => cachedObject[item.id] = item);
              this.dataAps = Object.values(cachedObject);
            });
      });

    this.searchKota.valueChanges
      .pipe(
        debounceTime(1000),
        filter( search => !!search),
        map( search => {
        })
      )
      .subscribe( res =>
        {
          this.service.getDataKota({limit:50, 'keys': 'kota', 'keyword': this.searchKota.value})
            .subscribe(keyKota => {
              this.dataKota = keyKota.data;
              let cachedObject = {};
              this.dataKota.concat(this.editList.kotas).map((item) => cachedObject[item] = item);
              this.dataKota = Object.values(cachedObject);
            })
        }
      );

    this.searchWitel.valueChanges
      .pipe(
        debounceTime(1000),
        filter( search => !!search),
        map( search => {
        })
      )
      .subscribe( res =>
        {
          this.service.getDataWitel({limit:50, 'keys': 'witel', 'keyword': this.searchWitel.value})
            .subscribe(keyWitel => {
              this.dataWitel = keyWitel.data;
              // this.dataWitel = this.dataWitel.concat(this.editList.witels);
              let cachedObject = {};
              this.dataWitel.concat(this.editList.witels).map((item) => cachedObject[item] = item);
              this.dataWitel = Object.values(cachedObject);
            });
        }
      );

    this.searchAccount.valueChanges
      .pipe(
        debounceTime(1000),
        filter(search => !!search),
        map(search => {
        }),
        // delay(500)
      )
      .subscribe(res =>
      {
        this.service.getDataAccount({limit:50, 'keys' : 'username', 'keyword': this.searchAccount.value})
          .subscribe( key => {
            this.dataAccount = key.data.data;
          })
      });

    this.searchGroup.valueChanges
      .pipe(
        debounceTime(1000),
        filter(search => !!search),
        map(search => {
        }),
        // delay(500)
      )
      .subscribe(res =>
      {
        this.service.getDataGroup({account_id: this.editList.account_id, limit:50, 'keys' : 'name', 'keyword': this.searchGroup.value})
          .subscribe( key => {
            this.dataGroup = key.data.data;
          })
      });
  }

  getDataGroup(id){
    this.service.getDataGroup({account_id: id, limit:50})
      .subscribe( res => {
        this.dataGroup = res.data.data;
      });
  }


  getDataGroupDefault(id){
    this.service.getDataGroup({account_id: id, limit:50})
      .subscribe( res => {
        this.dataGroup = res.data.data;
        if(this.dataGroup.length != 0){
          this.editList.group_id = this.dataGroup[0].id;
        }
      });
  }

  edit(){
    if(this.dataDateStart._start != null){
      this.editList._start = moment(this.dataDateStart._start).format('YYYY-MM_DD');
    }
    if(this.dataDateEnd._end != null){
      this.editList._end = moment(this.dataDateEnd._end).format('YYYY-MM_DD');
    }
    this.service.edit(this.editList).subscribe( res => {
      if (res.status === 1){
        Swal({
          title: 'Update',
          text: 'Your file has been update',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then( (hasil) => {
          if (hasil.value) {
            this.router.navigate(['/dashboard/advertisement']);
          }
        });
      }else{
        Swal(
          'Oops...',
          res.status_message,
          'error'
        );
      }
    });
  }

  checkName(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }

  checkCode(field, event){
    this.service.exist(field, {except_id: this.id, value: event})
      .subscribe( res => {
          this.dataCheckCode = res.data;
        }
      );
  }

  selectAps(data,event){
    if(event.source._selected){
      this.dataApsChecked.push(data);
    }else{
      this.dataApsChecked.splice(this.dataApsChecked.indexOf(data),1);
    }
  }

  getAccount(event){
    if(event.value == ''){
      this.service.getDataAccount({limit:50, 'keys' : 'username', 'keyword': this.searchAccount.value})
        .subscribe( key => {
          this.dataAccount = key.data.data;
        })
    }
  }

  getGroup(event){
    if(event.value == ''){
      {
        this.service.getDataGroup({account_id: this.editList.account_id, limit:50, 'keys' : 'name', 'keyword': this.searchGroup.value})
          .subscribe( key => {
            this.dataGroup = key.data.data;
          });
      }
    }
  }
}
