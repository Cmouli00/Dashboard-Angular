import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClientService } from 'src/app/Service/http-client.service';
import { Associate } from 'src/app/models/Associate';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Project } from 'src/app/models/Project';
import { MatDialog } from '@angular/material/dialog';
import { DownloadpdfComponent } from 'src/app/shared/components/downloadpdf/downloadpdf.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  associate:string[];
  project: Project;
  show:boolean;
  displayedColumns: string[] = ['id', 'firstname','Experience', 'mail', 'contact'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  id;

  constructor(private httpClientService:HttpClientService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.id = parseInt(localStorage.getItem('id'));

    this.httpClientService.getProjectassociateid(this.id).subscribe(
      response=>this.project=response[0],
    );
    
    
    this.httpClientService.getAssociate().subscribe(
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
