import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DownloadpdfComponent } from 'src/app/shared/components/downloadpdf/downloadpdf.component';
import { Associate } from 'src/app/models/Associate';

@Component({
  selector: 'app-report-project',
  templateUrl: './report-project.component.html',
  styleUrls: ['./report-project.component.scss']
})
export class ReportProjectComponent implements OnInit {

  associate:Associate[];
  associate1 = [];
  displayedColumns: string[] = ['id', 'firstname','Experience', 'mail', 'contact'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  id;
   a:string;
  constructor(private httpClientService:HttpClientService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem('id'));
    
    this.httpClientService.getProjectassociateid(this.id).subscribe(
      response =>{
        for(let i=0;i<response.length;i++){
          this.httpClientService.getProjectid(response[i].projectid).subscribe(
          response1=> {
          this.httpClientService.getAssociate().subscribe(
            response2=> {
              this.associate=this.mergeById(response1, response2)
              
              for(let j=0;j<this.associate.length;j++)
              {
                if(this.associate[j].associateid != this.id)
                  this.associate1.push(this.associate[j])
              }
              this.dataSource = new MatTableDataSource(this.associate1);
              this.dataSource.paginator = this.paginator;
                       
              
            });
          
          });
        }

        
      });
  }
  save(associate){
              this.dataSource.push(associate)
              this.dataSource.paginator = this.paginator;

  }

    mergeById = (a1, a2) =>
    a1.map(itm => ({
        ...a2.find((item) => (item.associateid === itm.associateid) && item),
        ...itm
    }));

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(id){
    localStorage.setItem('pdfid',id);
    this.dialog.open(DownloadpdfComponent);
  }
}
