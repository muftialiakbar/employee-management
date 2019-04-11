import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'cs-barchart',
  templateUrl: './barchart.component.html'
})

export class BarchartComponent implements OnChanges{
  @ViewChild('mainChart') mainChart: BaseChartDirective;
  @Input() dataBar = [];
  @Input() labelBar = [];
  public index =  0;



  ngOnInit(){
  }


  public barChartOptions:any = {
    title: {
      display: true,
      text: ['Location Statistics','Available up to 15 Locations'],
      fontSize: 15,
    },
    scaleShowVerticalLines: false,
    responsive: true,
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
      yAxes: [
        {
          id: 0,
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Impression',
            fontColor: '#ff6384',
          },
          gridLines :{
            color: '#ff6384',
            display: false
          },
          ticks: {
            // fontColor: '#ff6384',
            beginAtZero: true,
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              } else {
                if (value % 1 == 0) {
                  return value;
                }
              }
            }
          }
        },
        {
          id: 1,
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'Click',
            fontColor: '#36a2eb',
          },
          gridLines :{
            color: '#36a2eb',
            display: false
          },
          ticks: {
            // fontColor: '#36a2eb',
            beginAtZero: true,
            callback: function (value, index, values) {
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              } else {
                if (value % 1 == 0) {
                  return value;
                }
              }
            }
          }
        }
      ]
    }
  };
  // public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

/*  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }*/

/*  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /!**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     *!/
  }*/

 /* ngOnChanges(changes: SimpleChanges) {
    if(this.index != 0){
      // console.log(this.mainChart.chart.config.data.labels);
      this.mainChart.datasets = this.dataBar;
      this.mainChart.ngOnChanges({} as SimpleChanges);
      this.mainChart.chart.config.data.labels = this.labelBar;
      // console.log('refresh');
    }else{
      this.index++;
    }
  }*/

  ngOnChanges(changes: SimpleChanges){
    if(this.index != 0){
      this.mainChart.datasets = this.dataBar;
      this.mainChart.ngOnChanges({} as SimpleChanges);
      this.mainChart.chart.config.data.labels = this.labelBar;
    }else{
      this.index++;
    }
  }
}
