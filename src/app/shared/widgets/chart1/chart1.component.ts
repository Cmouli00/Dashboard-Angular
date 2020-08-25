import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { Status } from 'src/app/models/Status';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  status: Status[];
  public cnt;
  public value;


  constructor( private httpClientService:HttpClientService) { }

  ngOnInit(): void {

    this.httpClientService.getStatus().subscribe(
      response =>this.handleResponse(response)
      
     );
      this.cnt = parseInt(localStorage.getItem('value1'));
      this.value = parseInt(localStorage.getItem('value2'));

    this.chartOptions = {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      title: {
          text: 'Project<br>Status',
          align: 'center',
          verticalAlign: 'middle',
          y: 60
      },
      tooltip: {
          pointFormat: '{point.percentage:.1f}%</b>'
      },
      credits:{
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      plotOptions: {
          pie: {
              dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                      fontWeight: 'bold',
                      color: 'white'
                  }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
          }
      },
      series: [{
          type: 'pie',
          name: 'Browser share',
          innerSize: '50%',
          data: [
              ['Completed',  this.cnt],
              ['Uncompleted', this.value]
          ]
      }]
  }
  }

  handleResponse(response){
      this.status = response,
      this.cnt = this.getTrueCount(response);
      localStorage.setItem('value1',this.cnt);
      this.value = response.length-this.cnt;
      localStorage.setItem('value2',this.value);
  }

   getTrueCount(array) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i].wstatus == true) {
        count++;
      }
    }
    return count;
  }

}
