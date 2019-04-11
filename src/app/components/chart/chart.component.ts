import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector : 'cs-chart',
  templateUrl: './chart.component.html'

})

export class ChartComponent implements OnChanges{
  @ViewChild('mainChart') mainChart: BaseChartDirective;
  @Input() data = [];
  @Input() label = [];
  @Input() title = [];
  // public labelData: BaseChartDirective = [] as any;
  public index = 0;
  public actionLength = 0;

/*  public data = [];
  public lineChartData:Array<any> = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];*/
  // public lineChartLabels:Array<any> = [];
  ngOnInit(){
    this.labelPush();
  }

  public lineChartOptions:any = {
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
          var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          if(parseInt(value) >= 1000){
            return data.datasets[tooltipItem.datasetIndex].label+' : '+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          } else {
            return data.datasets[tooltipItem.datasetIndex].label+' : '+value;
          }
        }// end callbacks:
      }
    },
    hover: {
      mode: 'index',
      intersect: true
    },
    legend: {position: 'bottom'},
    scales: {
      xAxes: [{
        ticks: {
          display: false, //this will remove only the label
        }
      }],
      yAxes: [],
    }
  };
  /*public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];*/
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  ngOnChanges(changes: SimpleChanges){
    if(this.index != 0){
      this.labelPush();
      this.mainChart.datasets = this.data;
      this.mainChart.ngOnChanges({} as SimpleChanges);
      this.mainChart.chart.config.data.labels = this.label;
    }else{
      this.index++;
    }
  }

  labelPush(){
    let range = this.data.length;
    if(this.actionLength < range){
      for(let x=this.actionLength; x<range; x++) {
        this.lineChartOptions.scales.yAxes.push(
          {
            id: x,
            // position: ( range%2) == 1? 'left': 'right',
            position: x == 0? 'left': x == 1 ? 'right' : x == 2? 'left' : x == 3? 'right' : x == 4 ? 'left' : '',
             scaleLabel: {
               display: true,
               labelString: this.title[x],
               fontColor: x == 0? '#ff6384': x == 1 ? '#36a2eb' : x == 2? '#ffce56' : x == 3? 'grey' : x == 4 ? '#4bc0c0' : '',
             },
            gridLines :{
              color: x == 0? '#ff6384': x == 1 ? '#36a2eb' : x == 2? '#ffce56' : x == 3? 'grey' : x == 4 ? '#4bc0c0' : '',
              display: false
            },
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                if(parseInt(value) >= 1000){
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                } else {
                  if(value%1 == 0){
                    return value;
                  }
                }
              }
            }
          }
        )
      }
      this.updateTitle();
    }
    if(this.actionLength > range){
      for(let x=range; x<this.actionLength; x++) {
        this.lineChartOptions.scales.yAxes.pop()
      }
      this.updateTitle();
    }
    if(this.actionLength == range){
      this.updateTitle();
    }

    this.actionLength = range;

  }


  updateTitle(){
    for(let index=0; index< this.data.length; index++) {
      this.lineChartOptions.scales.yAxes[index].scaleLabel.labelString = this.title[index];
    }
  }
  /*public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }*/

  /*constructor(
    private service: ChartService
  ){}*/

}
