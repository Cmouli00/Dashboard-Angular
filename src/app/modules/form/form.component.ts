import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Associate } from 'src/app/models/Associate';
import { HttpClientService } from 'src/app/Service/http-client.service';
import { Project } from 'src/app/models/Project';
import { Status } from 'src/app/models/Status';
import { Router } from '@angular/router';
import { Competancy } from 'src/app/models/Competancy';

interface Course {
  value: number;
  viewValue: string;
}
interface Coms{
  value: boolean;
  view : string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  associate: Associate = new Associate();
  project: Project = new Project();
  status: Status = new Status();
  competancy: Competancy = new Competancy();
  id;

   courses: Course[] = [
    {value: 1, viewValue: 'Agile'},
    {value: 2, viewValue: 'Java'},
    {value: 3, viewValue: 'C'}
  ];

  coms: Coms[] = [
    {value: false, view: 'Incomplete'},
    {value: true, view: 'Complete'},
    
  ];
  value: any;
  

  constructor(private _formBuilder: FormBuilder, private httpClient: HttpClientService,
    private route: Router) { }

  ngOnInit(): void {
    this.id=parseInt(localStorage.getItem('id'));
    this.httpClient.getAssociateid(this.id)
     .subscribe(response => {
       if(response)
       {
        this.httpClient.getAssociateid(this.id)
          .subscribe(data => {
            console.log(data)
            this.associate = data;
          }, error => console.log(error));
                 
       }
        
     },);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  newAssociate(): void {
    this.associate = new Associate();
  }
  newProject(): void{
    this.project = new Project();
  }
  newStatus(): void {
    this.status = new Status();
  }
  newCompetancy(): void {
    this.competancy = new Competancy();
  }
  onSubmit(){
    this.associate.associateid = localStorage.getItem('id');
    this.save();
  }
  onSubmit1(){
    this.project.associateid = localStorage.getItem('id');
    this.save1();
  }
  onSubmit2(){
    this.status.associateid = localStorage.getItem('id');
    this.status.wstatus = this.value;
    this.save2();
  }
  onSubmit3(){
    this.competancy.associateid = localStorage.getItem('id');
    this.competancy.competancyid = this.value;
    this.competancy.competancyname = this.courses[this.value - 1].viewValue;
    this.save3();
  }

  save(){
    this.httpClient.createAssociate(this.associate)
    .subscribe(data => console.log(data), error => console.log(error));
    this.associate = new Associate();
  }
  save1(){
    this.httpClient.createProject(this.project)
    .subscribe(data => console.log(data), error => console.log(error));
    this.project = new Project();
  }
  save2(){
    this.httpClient.createStatus(this.status)
    .subscribe(data => console.log(data), error => console.log(error));
    this.status = new Status();
  }
  save3(){
    this.httpClient.createCompetancy(this.competancy)
    .subscribe(data=>console.log(data),error=> console.log(error));
    this.competancy = new Competancy;
  }
  changeClient(event) {
    this.value = event.value
}

  Dashboard(){
    this.route.navigate(['/home/dash']);
  }


  Update(){
    this.httpClient.updateAssociate(this.id, this.associate)
      .subscribe(data => console.log(data), error => console.log(error));
      this.associate = new Associate();
  }
  Update1(){
    this.httpClient.updateStatus(this.id, this.status)
      .subscribe(data => console.log(data), error => console.log(error));
      this.status = new Status();
  }




  

}
