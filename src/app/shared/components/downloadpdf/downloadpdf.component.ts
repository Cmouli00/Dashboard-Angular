import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";
import { HttpClientService } from 'src/app/Service/http-client.service';
import { Associate } from 'src/app/models/Associate';
import { Project } from 'src/app/models/Project';
import { Status } from 'src/app/models/Status';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-downloadpdf',
  templateUrl: './downloadpdf.component.html',
  styleUrls: ['./downloadpdf.component.scss']
})
export class DownloadpdfComponent implements OnInit {

  associate: Associate;
  massociate: Associate;
  hassociate: Associate;
  lassociate: Associate;
  id: number;
  project: Project[];
  status: Status;
  result;
  

  constructor(private route: ActivatedRoute,private httpClient: HttpClientService) { }

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem('pdfid'));

    this.httpClient.getAssociateid(this.id).subscribe(
      response =>{
        this.associate=response;
        if(response.managerid != null)
        this.httpClient.getAssociateid(response.managerid) .subscribe(
          response1=>this.massociate = response1,
        );
        if(response.hrid != null)
        this.httpClient.getAssociateid(response.hrid) .subscribe(
          response2=>this.hassociate = response2,
        );
        if(response.leadid != null)
        this.httpClient.getAssociateid(response.leadid) .subscribe(
          response3=>this.lassociate = response3,
        );
      });


     this.httpClient.getProjectassociateid(this.id).subscribe(
      response =>this.project=response,
     );
     
  
     this.httpClient.getStatusid(this.id).subscribe(
      response =>{
        if(response.wstatus != null){
        if(response.wstatus == true)
          this.result = "Completed";
        else
          this.result = "Incomplete";
        }
      }
     );

    
  }

  @ViewChild('content') content: ElementRef;

  public downloadPDF(){

    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      var imgWidth = 400;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });

  }

}
