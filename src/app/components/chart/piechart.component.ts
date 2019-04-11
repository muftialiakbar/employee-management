import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './piechart.component.html',
})
export class PieChartComponent implements OnInit {
  @ViewChild('mainChart') mainChart: BaseChartDirective;
  @Input() pieChartData = [];
  @Input() pieChartLabels = [];

  ngOnInit(){
  }


  // Pie
  public pieChartOptions: any = {
    legend: {position: 'bottom'},
    labels: {
      render: 'label',
      labelString: 'test',
    },
      tooltips: {
        mode: 'label',
        callbacks: {
          label: function(tooltipItem, data) {
            var indice = tooltipItem.index;
            return  data.labels[indice] +': '+data.datasets[0].data[indice] + '%';
          }
        }
      },
      responsive: true,
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            /*const label = ctx.chart.data.labels[ctx.dataIndex];
            console.log(label);
            return label;*/
          },
        },
      }
  };


  // public pieChartLabels = [['Download', 'Sales'], 'In-Store Sales', 'Mail Sales'];
  // public pieChartData =  [970.325, 14.541, 100];
  public pieChartType: string = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];


  chartClicked(e){
    // console.log(e.active[0]._index);
    if(e.active.length >=1){
      if(e.active[0]._index == 0){
        console.log('test 0');
      }else{
        console.log('kosong');
      }
    }
  }
  // events
/*  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }*/

  /*changeLabels() {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }*/

}


