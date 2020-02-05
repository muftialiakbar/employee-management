import {Component} from '@angular/core';
import {AdvertisementService} from '../../service/advertisement.service';
import {AdvertisementInterface} from '../../interface/advertisement.interface';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';
import * as moment from 'moment';
import {ExcelService} from '../../service/excel.service';

@Component({
  templateUrl: './view.advertisement.component.html'
})

export class ViewAdvertisementComponent {
  public datas: AdvertisementInterface[] = [];
  public dataPage: any = {};
  public list: AdvertisementInterface = [] as any;
  public page: number = 1;
  public searchKey: FormControl = new FormControl();
  public group: string;
  public filter : any = {};
  public dataExcel: AdvertisementInterface[] = [];
  public APs = [];
  public perPage : number;
  public currentPage: number;
  public limit = 20;
  public listAps : AdvertisementInterface = [] as any;

  constructor(
    private service : AdvertisementService,
    private excelService: ExcelService,
  ) {}

  ngOnInit(){
    this.list.isHidden = true;
    this.service.getData({page: this.page})
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });


    /*this.searchKey.valueChanges
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
      });*/
  }

  getID(id){
    return this.service.getDataID(id)
      .subscribe( res => {
        this.list = res.data;
        this.group = this.list.group.name;
        if(this.list.description == '<p>&nbsp;</p>'){
          this.list.description = '-';
        }
      });
  }

  pageChange(page) {
    this.filter.page = page;
    this.filter['keys'] =  'name';
    this.filter.limit = this.limit;
    this.service.getData(this.filter)
      .subscribe(res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  perPageChange(count){
    this.limit = count;
    this.filter['keys'] =  'name';
    this.filter.limit = count;
    this.filter.page = this.page;
    this.service.getData(this.filter)
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }

  startsearch(){
    if(this.searchKey.value != null){
      this.filter['keyword'] = this.searchKey.value;
    }
    this.filter['keys'] =  'name';
    this.service.getData(this.filter)
      .subscribe( res => {
        this.datas = res.data.data;
        this.dataPage = res.data;
        this.currentPage = res.data.current_page;
        this.perPage = res.data.per_page;
      });
  }


  search(event){
    if(event.value == ''){
        this.service.getData({'keys' : 'name', 'keyword': this.searchKey.value})
          .subscribe( key => {
            this.datas = key.data.data;
            this.dataPage = key.data;
          });
    }
  }

  dateFormat(date) {
    if(date == null) return null;
    else return moment(date).format('dddd, DD MMMM YYYY, HH:mm');
  }

  convert(data){
    if(parseInt(data) >= 1000){
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return data;
    }
  }


  doExportExcelAll() {
    const excelData: any = [];

    /*if(this.filter._start_last != undefined){
      this.filter._start_last = moment(this.filter._start_last).format('YYYY-MM-DD');
    }else{
      delete this.filter._start_last;
    }
    if(this.filter._end_last != undefined){
      this.filter._end_last = moment(this.filter._end_last).format('YYYY-MM-DD');
    }else{
      delete this.filter._end_last;
    }
    if(this.searchKey.value != null){
      this.filter['keyword'] = this.searchKey.value;
    }*/
    // this.filter['keys'] =  'name';
    this.filter.limit = 500;
    this.filter.page = this.page;
    this.service.getDataExcel(this.filter)
      .subscribe(  res => {
        this.dataExcel = res.data;

        this.dataExcel.forEach(data=> {
          //convert tag html to string
          let html = data.description;
          let div = document.createElement("div");
          div.innerHTML = html;
          let description = div.textContent || div.innerText || "";

          // this.listAps = res.data;
          data.aps.forEach(item => {
            this.APs.push(item.ap_name);
          });

          excelData.push({
            'Merchant' : data.group.name,
            'Name': data.name,
            'Code': data.code,
            'Description': description,
            'Start Date' : data._start,
            'End Date' : data._end,
            'Type': data.type == "01" ? 'cpm' : data.type == "02" ? 'cpc' : data.type == "03" ? 'cpv' : data.type == "04" ? 'cpa' : data.type == "05" ? 'cpo' : '',
            'OS' : data.os,
            'APs' : data.isSelected > 0 ? this.APs.toString() :  'All',
            'Budget' : 'Rp.' + data.budget,
            'Price' : 'Rp.' + data.price,
            'Impression' : data._impression,
            'Click' : data._click,
            'View' : data._view,
            'Target' : data.target,
            'Reach' : data.reach,
            'Bill' : 'Rp.' + data.reach*data.price,
          });
        });
        this.excelService.exportAsExcelFile(excelData, 'Report ' + moment().format('DD-MM-YYYY HH.mm.ss'), );
      });
    this.APs = [];
  }

  doExportExcel(id) {
    const excelData: any = [];
    this.service.getDataID(id)
      .subscribe(  res => {
        this.list = res.data;
        //convert tag html to string
        let html = this.list.description;
        let div = document.createElement("div");
        div.innerHTML = html;
        let description = div.textContent || div.innerText || "";
        this.listAps = res.data;
        this.listAps.aps.forEach(item => {
          this.APs.push(item.ap_name);
        });
        excelData.push({
          'Merchant' : this.list.group.name,
          'Name': this.list.name,
          'Code': this.list.code,
          'Description': description,
          'Start Date' : this.list._start,
          'End Date' : this.list._end,
          'Type': this.list.type == "01" ? 'cpm' : this.list.type == "02" ? 'cpc' : this.list.type == "03" ? 'cpv' : this.list.type == "04" ? 'cpa' : this.list.type == "05" ? 'cpo' : '',
          'OS' : this.list.os,
          'APs' : this.list.isSelected > 0 ? this.APs.toString() :  'All',
          'Budget' : 'Rp.' + this.list.budget,
          'Price' : 'Rp.' + this.list.price,
          'Impression' : this.list._impression,
          'Click' : this.list._click,
          'View' : this.list._view,
          'Target' : this.list.target,
          'Reach' : this.list.reach,
          'Bill' : 'Rp.' + this.list.reach*this.list.price,
        });
        this.excelService.exportAsExcelFile(excelData, 'Report ' + moment().format('DD-MM-YYYY HH.mm.ss'), );
      });
    this.APs = [];
  }
}
