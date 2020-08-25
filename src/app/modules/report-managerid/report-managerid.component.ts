import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DownloadpdfComponent } from 'src/app/shared/components/downloadpdf/downloadpdf.component';

@Component({
  selector: 'app-report-managerid',
  templateUrl: './report-managerid.component.html',
  styleUrls: ['./report-managerid.component.scss']
})
export class ReportManageridComponent implements OnInit {

  associate:string[];
  displayedColumns: string[] = ['id', 'firstname','Experience', 'mail', 'contact'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  id;
  constructor(private httpClientService:HttpClientService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem('id'));
    
    this.httpClientService.getAssociateManager(this.id).subscribe(
      response =>{
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      });
  }

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
