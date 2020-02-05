import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {ChartService} from '../../service/chart.service';
import * as moment from 'moment';
import {takeUntil} from 'rxjs/operators';
import {ExcelService} from '../../service/excel.service';
import {AdvertisementService} from '../../service/advertisement.service';

@Component({
  templateUrl :'./statistics.component.html'
})

export class StatisticsComponent {
  public id: number;

  //Chart
  public lineChartData:Array<any> = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = [];
  private ngUnsubscribe: Subject<any> = new Subject();
  public dataDate = {} as any;
  public dataSet = {} as any;
  public action = [] as any;
  public time : string;
  public start_date : string;
  public end_date : string;
  public dateTimeRange: Date[];
  public range : any;
  public rangeCustom : any;
  public impressionMerge: number;
  public clickMerge: string;
  public viewMerge: string;
  public actionMerge: string;
  public orderMerge: string;
  public sessionMerge: string;
  public deviceMerge: string;
  public datas = [] as any;
  public setDay: string;
  public year= [] as any;
  public location = [] as any;
  public advertisementData = [] as any;
  public statusButton : boolean;

  public minDate = moment(new Date(2019, 0, 1)).format('YYYY-MM-DD');
  public maxDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');

  public dataProfile = [] as any;
  public group_id : string;
  private nameAdvertisement: string;
  public dataConvert = [] as any;


  constructor(
    private service: ChartService,
    private excelService: ExcelService,
    private advertisementService: AdvertisementService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.statusButton = true;

    this.activatedRoute.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    );

    this.advertisementService.getDataID(this.id)
      .subscribe(res => {
        this.advertisementData = res.data;
      });

    this.dataSet.id = this.id;
    this.dataSet.time = 'week';
    this.dataSet.action = ['impression'];
    this.dataSet.components = ['group_id'];

    //set tanggal Default
    var startDateD = moment(new Date()).add(-1, 'month').format('YYYY-MM-DD');
    var endDateD = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
    this.dataSet.start_date = moment(startDateD).format('YYYY-MM-DD');
    this.dataSet.end_date = moment(endDateD).format('YYYY-MM-DD');
    this.dateTimeRange = [this.dataSet.start_date, this.dataSet.end_date];

    //menentukan range tanggal
    let startDate = moment(this.dataSet.start_date, "YYYY-MM-DD");
    let endDate = moment(this.dataSet.end_date, "YYYY-MM-DD");
    this.range = endDate.diff(startDate, 'days');


    this.service.getProfile()
      .subscribe(
        res => {
          this.dataProfile = res.data;
          this.group_id = res.data.group_id;
          this.dataSet.component_values = [this.group_id.toString()];


          //LINE CHART
          this.service.getData(this.dataSet.time, this.dataSet)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe( res =>{
              let dataChart = [];
              let label = [];
              res.data.forEach(data => {
                dataChart.push(data._impression);
                label.push('Week '+data._week+', '+moment().year(data._year).dayOfYear(Number(data._week * 7))
                  .subtract(6,'days').format('DD MMM YYYY')+' - '+moment().year(data._year)
                  .dayOfYear(Number(data._week*7)).format('DD MMM YYYY'));
              });
              this.lineChartData = [{data : dataChart, label: this.dataSet.action}];
              this.lineChartLabels = label;
            });

          //GET DATA MERGE
          this.service.getDataMerge(
            this.dataSet.time,
            {
              components: this.dataSet.components,
              component_values: this.dataSet.component_values,
              id: this.dataSet.id,
              action: ['impression','click','view','action','order'],
              merge: true, start_date: this.dataSet.start_date,
              end_date: this.dataSet.end_date
              }
            )
            .subscribe( res =>{
              this.impressionMerge = res.data._impression;
              this.clickMerge = res.data._click;
              this.viewMerge = res.data._view;
              this.actionMerge = res.data._action;
              this.orderMerge = res.data._order;
              this.sessionMerge = res.data.unique_session;
              this.deviceMerge = res.data.unique_device;
            });

          //GET DATA TABLE
          this.service.getDataTable(
            this.dataSet.time,
            {
              components: this.dataSet.components,
              component_values: this.dataSet.component_values,
              id: this.dataSet.id,
              action: ['impression','click','view','action','order'],
              start_date: this.dataSet.start_date,
              end_date: this.dataSet.end_date
              }
            )
            .subscribe(res => {
              this.datas = res.data;
              this.convertDataToDate();
            });
          }
        );

    this.advertisementService.getDataID(this.id).subscribe(res => {
      this.nameAdvertisement = res.data.name;
    });
  }


  configDay() {
    if (this.setDay == '2days') {
      var startDate = moment(new Date()).add(-2, 'days').format('YYYY-MM-DD');
      var endDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
      this.dataSet.start_date = moment(startDate).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(endDate).format('YYYY-MM-DD');

      //hitung jarak tanggal yang dipilih
      let minDate = moment(new Date(2019, 0, 1)).format('YYYY-MM-DD');// default tanggal awal
      let startDateCustom = moment(this.dataSet.start_date, "YYYY-MM-DD");// tanggal awal yang di pilih
      this.rangeCustom = startDateCustom.diff(minDate, 'days');
      if(this.rangeCustom <0){
        this.dataSet.start_date = this.minDate;
      }
      this.dateTimeRange = [this.dataSet.start_date, this.dataSet.end_date];

      //menentukan range tanggal
      let start = moment(this.dataSet.start_date, "YYYY-MM-DD");
      let end = moment(this.dataSet.end_date, "YYYY-MM-DD");
      this.range = end.diff(start, 'days');
      // this.render();
    } else if (this.setDay == '7days') {
      var startDate = moment(new Date()).add(-7, 'days').format('YYYY-MM-DD');
      var endDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
      this.dataSet.start_date = moment(startDate).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(endDate).format('YYYY-MM-DD');


      //hitung jarak tanggal yang dipilih
      let minDate = moment(new Date(2019, 0, 1)).format('YYYY-MM-DD');// default tanggal awal
      let startDateCustom = moment(this.dataSet.start_date, "YYYY-MM-DD");// tanggal awal yang di pilih
      this.rangeCustom = startDateCustom.diff(minDate, 'days');
      if(this.rangeCustom <0){
        this.dataSet.start_date = this.minDate;
      }
      this.dateTimeRange = [this.dataSet.start_date, this.dataSet.end_date];

      //menentukan range tanggal
      let start = moment(this.dataSet.start_date, "YYYY-MM-DD");
      let end = moment(this.dataSet.end_date, "YYYY-MM-DD");
      this.range = end.diff(start, 'days');
      if(this.range > 5){
        this.dataSet.time = "daily";
      }
      // this.render();
    }else if (this.setDay == '1month'){
      var startDate = moment(new Date()).add(-1, 'month').format('YYYY-MM-DD');
      var endDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
      this.dataSet.start_date = moment(startDate).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(endDate).format('YYYY-MM-DD');

      //hitung jarak tanggal yang dipilih
      let minDate = moment(new Date(2019, 0, 1)).format('YYYY-MM-DD');// default tanggal awal
      let startDateCustom = moment(this.dataSet.start_date, "YYYY-MM-DD");// tanggal awal yang di pilih
      this.rangeCustom = startDateCustom.diff(minDate, 'days');
      if(this.rangeCustom <0){
        this.dataSet.start_date = this.minDate;
      }
      this.dateTimeRange = [this.dataSet.start_date, this.dataSet.end_date];

      //menentukan range tanggal
      let start = moment(this.dataSet.start_date, "YYYY-MM-DD");
      let end = moment(this.dataSet.end_date, "YYYY-MM-DD");
      this.range = end.diff(start, 'days');
      if(this.range > 26){
        this.dataSet.time = "daily";
      }
      // this.render();
    }else if (this.setDay == '3month'){
      var startDate = moment(new Date()).add(-3, 'month').format('YYYY-MM-DD');
      var endDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
      this.dataSet.start_date = moment(startDate).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(endDate).format('YYYY-MM-DD');

      //hitung jarak tanggal yang dipilih
      let minDate = moment(new Date(2019, 0, 1)).format('YYYY-MM-DD');// default tanggal awal
      let startDateCustom = moment(this.dataSet.start_date, "YYYY-MM-DD");// tanggal awal yang di pilih
      this.rangeCustom = startDateCustom.diff(minDate, 'days');
      if(this.rangeCustom <0){
        this.dataSet.start_date = this.minDate;
      }
      this.dateTimeRange = [this.dataSet.start_date, this.dataSet.end_date];

      //menentukan range tanggal
      let start = moment(this.dataSet.start_date, "YYYY-MM-DD");
      let end = moment(this.dataSet.end_date, "YYYY-MM-DD");
      this.range = end.diff(start, 'days');
      if(this.range > 60){
        this.dataSet.time = "week";
      }
      // this.render();
    }else if (this.setDay == '6month'){
      var startDate = moment(new Date()).add(-6, 'month').format('YYYY-MM-DD');
      var endDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
      this.dataSet.start_date = moment(startDate).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(endDate).format('YYYY-MM-DD');

      //hitung jarak tanggal yang dipilih
      let minDate = moment(new Date(2019, 0, 1)).format('YYYY-MM-DD');// default tanggal awal
      let startDateCustom = moment(this.dataSet.start_date, "YYYY-MM-DD");// tanggal awal yang di pilih
      this.rangeCustom = startDateCustom.diff(minDate, 'days');
      if(this.rangeCustom <0){
        this.dataSet.start_date = this.minDate;
      }
      this.dateTimeRange = [this.dataSet.start_date, this.dataSet.end_date];

      //menentukan range tanggal
      let start = moment(this.dataSet.start_date, "YYYY-MM-DD");
      let end = moment(this.dataSet.end_date, "YYYY-MM-DD");
      this.range = end.diff(start, 'days');
      if(this.range > 60){
        this.dataSet.time = "week";
      }
      // this.render();
    }else if (this.setDay == '1year'){
      var startDate = moment(new Date()).add(-1, 'year').format('YYYY-MM-DD');
      var endDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
      this.dataSet.start_date = moment(startDate).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(endDate).format('YYYY-MM-DD');

      //hitung jarak tanggal yang dipilih
      let minDate = moment(new Date(2019, 0, 1)).format('YYYY-MM-DD');// default tanggal awal
      let startDateCustom = moment(this.dataSet.start_date, "YYYY-MM-DD");// tanggal awal yang di pilih
      this.rangeCustom = startDateCustom.diff(minDate, 'days');
      if(this.rangeCustom <0){
        this.dataSet.start_date = this.minDate;
      }
      this.dateTimeRange = [this.dataSet.start_date, this.dataSet.end_date];

      //menentukan range tanggal
      let start = moment(this.dataSet.start_date, "YYYY-MM-DD");
      let end = moment(this.dataSet.end_date, "YYYY-MM-DD");
      this.range = end.diff(start, 'days');
      if(this.range > 180){
        this.dataSet.time = "month";
      }
      // this.render();
    }

    //hitung Range tanggal
    let startDateRange = moment(this.dataSet.start_date, "YYYY-MM-DD");
    let endDateRange = moment(this.dataSet.end_date, "YYYY-MM-DD");
    this.range = endDateRange.diff(startDateRange, 'days');
  }

  configRangeDate(){
    if (this.dateTimeRange != null){
      this.dataSet.start_date = moment(this.dateTimeRange[0]).format('YYYY-MM-DD');
      this.dataSet.end_date = moment(this.dateTimeRange[1]).format('YYYY-MM-DD');

      //hitung Range tanggal
      let startDateRange = moment(this.dataSet.start_date, "YYYY-MM-DD");
      let endDateRange = moment(this.dataSet.end_date, "YYYY-MM-DD");
      this.range = endDateRange.diff(startDateRange, 'days');

      //set range
      if(this.range > 30){
        this.dataSet.time = "week";
      }else if(this.range > 180){
        this.dataSet.time = "month";
      }
      // this.render();
    }

    this.setDay = '';
  }

  private sendData(value) {
    let send: any = [];
    this.dataSet.action.forEach((res,index) => {
      let tamp = [];
      value.forEach( arr => {
        tamp.push(Number(arr['_'+res]));
      });
      send.push({data: tamp, label: res, yAxisID: index});
    });
    return send;
  }

  renderChart() {
    if (this.dataSet.action.length < 1) {
      this.dataSet.action = ['impression'];
    }

    this.datas = [];
    this.service.getProfile()
      .subscribe(
        res => {
          this.dataProfile = res.data;
          this.group_id = res.data.group_id;
          this.dataSet.component_values = [this.group_id.toString()];


          //LINE CHART
          this.service.getData(this.dataSet.time, this.dataSet)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
              let dataChart = this.sendData(res.data);
              this.lineChartData = dataChart;
              let label = [];
              res.data.forEach(data => {
                if (this.dataSet.time == 'hourly') {
                  label.push(moment(data._date).hour(data._hour).format('dddd, DD MMMM YYYY, HH:00'));
                } else if (this.dataSet.time == 'daily') {
                  label.push(moment(data._date).format('dddd, DD MMMM YYYY'));
                } else if (this.dataSet.time == 'week') {
                  if (data._week != 53) {
                    label.push('Week ' + data._week + ', ' + moment().year(data._year).dayOfYear(Number(data._week * 7))
                      .subtract(6, 'days').format('DD MMM YYYY') + ' - ' + moment()
                      .year(data._year).dayOfYear(Number(data._week * 7))
                      .format('DD MMM YYYY'));
                  } else {
                    label.push('Week ' + data._week + ', ' + moment().year(data._year).dayOfYear(Number(data._week * 7))
                      .subtract(6, 'days').format('DD MMM YYYY') + ' - ' + moment()
                      .year(data._year).month(11).date(31)
                      .format('DD MMM YYYY'));
                  }
                } else if (this.dataSet.time == 'month') {
                  label.push(data._name + ' ' + data._year);
                }
              });
              this.lineChartLabels = label;
            });

          //GET DATA MERGE
          this.service.getDataMerge(this.dataSet.time, {components: this.dataSet.components,component_values: this.dataSet.component_values, id: this.dataSet.id, action: ['impression','click','view','action','order'], merge: true, start_date: this.dataSet.start_date, end_date: this.dataSet.end_date})
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe( res =>{
              this.impressionMerge = res.data._impression;
              this.clickMerge = res.data._click;
              this.viewMerge = res.data._view;
              this.actionMerge = res.data._action;
              this.orderMerge = res.data._order;
              this.sessionMerge = res.data.unique_session;
              this.deviceMerge = res.data.unique_device;
            });

          //GET DATA TABLE
          this.service.getDataTable(this.dataSet.time, {components: this.dataSet.components,component_values: this.dataSet.component_values, id: this.dataSet.id, action: ['impression','click','view','action','order'], start_date: this.dataSet.start_date, end_date: this.dataSet.end_date})
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
              this.datas = res.data;
              this.convertDataToDate();
              res.data.forEach(data => {
                this.year = data._year;
              })
            });
        }
      );
  }


  percentClick(data){
    if(data._click != 0 && data._impression != 0){
      let count = data._click/data._impression*100;
      let convert = Math.round(count * 100)/100;
      let percent = convert;
      return percent;
    }else{
      let percent = '0.00';
      return percent;
    }
  }


  percentView(data){
    if(data._view != 0 && data._impression != 0){
      let count = data._view/data._impression*100;
      let convert = Math.round(count * 100)/100;
      let percent = convert;
      return percent;
    }else{
      let percent = '0.00';
      return percent;
    }
  }

  percentAction(data){
    if(data._action != 0 && data._impression != 0){
      let count = data._action/data._impression*100;
      let convert = Math.round(count * 100)/100;
      let percent = convert;
      return percent;
    }else{
      let percent = '0.00';
      return percent;
    }
  }

  renderMerge(data){
    if(data != 0){
      let count = data/this.impressionMerge*100;
      let convert = Math.round(count * 100)/100;
      let percent = convert;
      return percent;
    }else{
      let percent = '0.00';
      return percent;
    }
  }



  convertDate(data){
    if(this.dataSet.time == 'hourly'){
      let hourly = moment(data._date).hour(data._hour).format('dddd, DD MMMM YYYY, HH:00');
      return hourly;
    }
    else if(this.dataSet.time == 'daily'){
      let daily = moment(data._date).format('dddd, DD MMMM YYYY');
      return daily;
    }else if(this.dataSet.time == 'week'){
      let week = 'Week '+data._week+', '+moment().year(data._year).dayOfYear(Number(data._week * 7))
        .subtract(6,'days').format('DD MMM YYYY')+' - '+moment().year(data._year)
        .dayOfYear(Number(data._week*7)).format('DD MMM YYYY');
      return week;
    }else if(this.dataSet.time == 'month'){
      let month = data._name+ ' ' + data._year;
      return month;
    }
  }

  convert(data){
    if(parseInt(data) >= 1000){
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return data;
    }
  }

 /* render(){
    this.renderChart();
  }*/

  doExportExcelData() {
    const excelData: any = [];
    this.datas.forEach( (item,i) => {
      excelData.push({
        Date: this.dataConvert[i],
        Imperssion: this.convert(item._impression),
        'Click': this.convert(item._click),
        'CTR': this.percentClick(item) + '%',
        'View': this.convert(item._view),
        'VTR': this.percentView(item) + '%',
        'Action': this.convert(item._action),
        'ATR': this.percentAction(item) + '%'});
    });
    this.excelService.exportAsExcelFile(excelData, 'Report ' + this.nameAdvertisement + ' ' + moment().format('DD-MM-YYYY HH.mm.ss'));
  }

  searchStatistic() {
    this.renderChart();
  }

  convertDataToDate(){
    this.dataConvert = [];

    //untuk data di table (convert data Date)
    if(this.dataSet.time == 'hourly'){
      this.datas.forEach( data =>{
        let hourly = moment(data._date).hour(data._hour).format('dddd, DD MMMM YYYY, HH:00');
        this.dataConvert.push(hourly);
      });
    }
    else if(this.dataSet.time == 'daily'){
      this.datas.forEach( data =>{
        let daily = moment(data._date).format('dddd, DD MMMM YYYY');
        this.dataConvert.push(daily);
      });
    }else if(this.dataSet.time == 'week'){
      this.datas.forEach( res =>{
        let week = 'Week '+res._week+', '+moment().year(res._year).dayOfYear(Number(res._week * 7))
          .subtract(6,'days').format('DD MMM YYYY')+' - '+moment().year(res._year)
          .dayOfYear(Number(res._week*7)).format('DD MMM YYYY');
        this.dataConvert.push(week);
      });
    }else if(this.dataSet.time == 'month'){
      this.datas.forEach( data =>{
        let month = data._name+ ' ' + data._year;
        this.dataConvert.push(month);
      });
    }
  }
}
