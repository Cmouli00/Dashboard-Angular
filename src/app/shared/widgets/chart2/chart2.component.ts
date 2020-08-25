import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { Competancy } from 'src/app/models/Competancy';
@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {


  chartOptions: {};
  Highcharts = Highcharts;
  id;
  agile;
  java;
  c;
  competancy: Competancy[];
  constructor(private httpClientService:HttpClientService) { }

  ngOnInit(): void {

    this.id=localStorage.getItem('id');

    this.httpClientService.getAssCompetancy(this.id).subscribe(
      response=> this.handleResponse(response)
    );
    this.agile = parseInt(localStorage.getItem('Agile'));
    this.java = parseInt(localStorage.getItem('Java'));
    this.c = parseInt(localStorage.getItem('C'));

    this.chartOptions={

      chart: {
        type: 'column'
    },
    title: {
        text: 'Competancy Rank'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rank'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Rank: <b>E{point.y}</b>'
    },
    credits:{
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
    series: [{
        name: 'Population',
        data: [
            ['Agile', this.agile],
            ['Java', this.java],
            ['C', this.c],
            
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: 'E{point.y}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
    }
  }

  handleResponse(response){
    for(let i=0;i<response.length;i++){
      this.httpClientService.getCompetancyid(response[i].competancyid).subscribe(
          response1=> {
            for(let j=0;j<response1.length;j++)
            {
              if(response1[j].competancyname == "Agile")
                localStorage.setItem('Agile',response1[j].competancyrank);
              else if(response1[j].competancyname == "Java")
               localStorage.setItem('Java',response1[j].competancyrank);
              else
              localStorage.setItem('C',response1[j].competancyrank);
            }
          }
      );
    }
    
  }


}
