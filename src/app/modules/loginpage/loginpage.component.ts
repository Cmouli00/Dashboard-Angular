import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/Service/http-client.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  userid: any;
  
  constructor(private router: Router,private httpClient: HttpClientService) { }

  ngOnInit(): void {
  }

  onSubmit(event){
    
    localStorage.setItem("id",event.target.userid.value);
    this.userid = localStorage.getItem("id")

    this.httpClient.getAssociateid(this.userid)
     .subscribe(response => {
       if(response)
        this.router.navigate(['/home/dash']);
        else
        this.router.navigate(['/home/form']);
     },);
  }
  }


