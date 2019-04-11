import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../service/advertisement.service';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {AdvertisementInterface} from '../../interface/advertisement.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';

@Component({
  templateUrl: './add.advertisement.component.html'
})

export class AddAdvertisementComponent implements OnInit{

  public dataAdd: AdvertisementInterface = {} as AdvertisementInterface;
  public dataDate: AdvertisementInterface = {} as any;
  public dataAccount = [];
  public dataGroup = [];
  public dataAps =  [];
  public dataKota = [];
  public dataWitel = [];
  public dataRegional = [];
  public dataCheckName;
  public dataCheckCode;
  public Editor = ClassicEditor;
  public dataApsChecked = [];
  public searchAps: FormControl = new FormControl();
  public searchKota: FormControl = new FormControl();
  public searchWitel: FormControl = new FormControl();
  public searchAccount: FormControl = new FormControl();
  public searchGroup: FormControl = new FormControl();
  public data= [] as any;

  public start_date : string;
  public end_date : string;
  public dateTimeRange: Date[];
  public dataSet = {} as any;


  constructor(
    private service: AdvertisementService,
    private router: Router,
  ){}

  ngOnInit(){
    this.dataAdd.type = "01";
    this.dataAdd.gender = "00";
    this.dataAdd.charging_type = "target";
    this.dataAdd.isNational = 0;
    this.dataAdd.isActive = 0;
    this.dataAdd.isFeatured = 0;
    this.dataAdd.description = '';
    this.dataAdd.target = 1000;

    /*this.service.getDataAccount({limit: 50})
      .subscribe( res => {
        this.dataAccount = res.data.data;
        this.dataAdd.hours = [];
        this.dataAdd.account_id = this.dataAccount[0].id;
      });*/

    this.service.getDataGroup({account_id: this.dataAdd.account_id, limit:50})
      .subscribe( res => {
        this.dataGroup = res.data.data;
        this.dataAdd.hours = [];
        if(this.dataGroup.length != 0){
          this.dataAdd.group_id = this.dataGroup[0].id;
        }
      });




    this.service.getDataAps({limit: 50})
      .subscribe( res => {
        this.dataAps = res.data;
      });

    this.service.getDataKota({limit: 50})
      .subscribe( res => {
        this.dataKota = res.data;
      });

    this.service.getDataWitel({limit: 50})
      .subscribe( res => {
        this.dataWitel = res.data;
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
          })
      });

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
        this.service.getDataGroup({account_id: this.dataAdd.account_id, limit:50, 'keys' : 'name', 'keyword': this.searchGroup.value})
          .subscribe( key => {
            this.dataGroup = key.data.data;
          })
      });


    this.searchKota.valueChanges
      .pipe(
        debounceTime(1000),
        filter( search => !!search),
        map( search => {
        }),
        // delay(500)
      )
      .subscribe( res =>
        {
          this.service.getDataKota({limit:50, 'keys': 'kota', 'keyword': this.searchKota.value})
            .subscribe(keyKota => {
              this.dataKota = keyKota.data;
              if(this.dataAdd.kotas != null){
                let cachedObject = {};
                this.dataKota.concat(this.dataAdd.kotas).map((item) => cachedObject[item] = item);
                this.dataKota = Object.values(cachedObject);
              }
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
              if(this.dataAdd.witels != null){
                let cachedObject = {};
                this.dataWitel.concat(this.dataAdd.witels).map((item) => cachedObject[item] = item);
                this.dataWitel = Object.values(cachedObject);
              }
            })
        }
      );
  }

  getDataGroup(id){
    this.service.getDataGroup({account_id: id, limit:50})
      .subscribe( res => {
        this.dataGroup = res.data.data;
        if(this.dataGroup.length != 0){
          this.dataAdd.group_id = this.dataGroup[0].id;
        }
      });
  }


  add(e){
    if(this.dataDate._start != null){
      this.dataAdd._start = moment(this.dataDate._start).format('YYYY-MM_DD');
    }
    if(this.dataDate._end != null){
      this.dataAdd._end = moment(this.dataDate._end).format('YYYY-MM_DD');
    }

    /*if(this.dateTimeRange != null){
      this.dataAdd._start = this.dataSet.start_date;
      this.dataAdd._end = this.dataSet.end_date;
    }*/

    this.service.add(this.dataAdd)
      .subscribe(res => {
        if (res.status === 1){
          Swal({
            title: 'Insert',
            text: 'Insert Success',
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then((hasil) => {
            if (hasil.value) {
              /*window.location.reload();*/
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
      }
    );
  }

  check(field, event){
    this.service.exist(field, {value: event})
      .subscribe( res => {
          this.dataCheckName = res.data;
        }
      );
  }

  checkCode(field, event){
    this.service.exist(field, {value: event})
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
        this.service.getDataGroup({account_id: this.dataAdd.account_id, limit:50, 'keys' : 'name', 'keyword': this.searchGroup.value})
          .subscribe( key => {
            this.dataGroup = key.data.data;
          });
      }
    }
  }

  getAps(event){
    if(event.value == ''){
      this.service.getDataAps({limit:50, 'keys' : 'ap_name', 'keyword': this.searchAps.value})
        .subscribe( key => {
          this.dataAps = key.data;
          let cachedObject = {};
          this.dataAps.concat(this.dataApsChecked).map((item) => cachedObject[item.id] = item);
          this.dataAps = Object.values(cachedObject);
        })
    }
  }

  getKota(event){
    if(event.value == ''){
      this.service.getDataKota({limit:50, 'keys': 'kota', 'keyword': this.searchKota.value})
        .subscribe(keyKota => {
          this.dataKota = keyKota.data;
          if(this.dataAdd.kotas != null){
            let cachedObject = {};
            this.dataKota.concat(this.dataAdd.kotas).map((item) => cachedObject[item] = item);
            this.dataKota = Object.values(cachedObject);
          }
        });
    }
  }


  getWitel(event){
    if(event.value == ''){
      this.service.getDataWitel({limit:50, 'keys': 'witel', 'keyword': this.searchWitel.value})
        .subscribe(keyWitel => {
          this.dataWitel = keyWitel.data;
          if(this.dataAdd.witels != null){
            let cachedObject = {};
            this.dataWitel.concat(this.dataAdd.witels).map((item) => cachedObject[item] = item);
            this.dataWitel = Object.values(cachedObject);
          }
        });
    }
  }

  configRangeDate(){
    if (this.dateTimeRange != null){
      this.dataSet.start_date = moment(this.dateTimeRange[0]).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(this.dateTimeRange[1]).format('YYYY-MM-DD');
      console.log(this.dataSet.start_date);
      console.log(this.dataSet.end_date);
    }
  }
}
