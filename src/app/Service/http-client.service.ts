import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Associate } from '../models/Associate';
import { Status } from '../models/Status';
import { Project } from '../models/Project';
import { Competancy } from '../models/Competancy';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private baseUrl ='http://localhost:8080';
  constructor(private httpClient:HttpClient) { }

  getAssociate()
  {
    return this.httpClient.get<Associate[]>(`${this.baseUrl}/associates`)
  }
  getAssociateid(id:number):Observable<any>
  {
     return this.httpClient.get(`${this.baseUrl}/associates/id/${id}`);
  }
  getAssociateName(name:string):Observable<any>{
    return this.httpClient.get<Associate[]>(`${this.baseUrl}/associates/${name}`);
  }
  getAssociateManager(id:number):Observable<any>
  {
    return this.httpClient.get<Associate[]>(`${this.baseUrl}/associates/managerid/${id}`);
  }
  createAssociate(associate: Object) : Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/associates/create`,associate);
  }
  updateAssociate(id: number,value: any): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/associates/update/${id}`,value);
  }
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/associates/${id}`, { responseType: 'text' });
  }


  getProject()
  {
    return this.httpClient.get<Project[]>(`${this.baseUrl}/project`)
  }
  getProjectassociateid(id:number):Observable<any>
  {
     return this.httpClient.get<Project[]>(`${this.baseUrl}/project/${id}`);
  }
  getProjectid(id:number):Observable<any>
  {
    return this.httpClient.get<Project[]>(`${this.baseUrl}/project/projectid/${id}`);
  }
  
  createProject(project: Object) : Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/project/create`,project);
  }
  getStatus()
  {
    return this.httpClient.get<Status[]>(`${this.baseUrl}/status`)
  }
  getStatusid(id:number):Observable<any>
  {
     return this.httpClient.get<Status[]>(`${this.baseUrl}/status/${id}`);
  }

  updateStatus(id: number,value: any): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/status/update/${id}`,value);
  }
  
  createStatus(status: Object) : Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/status/create`,status);
  }
  getCompetancy()
  {
    return this.httpClient.get<Competancy[]>(`${this.baseUrl}/competancy`)
  }
  getAssCompetancy(id:number): Observable<any>
  {
    return this.httpClient.get<Competancy[]>(`${this.baseUrl}/competancy/${id}`)
  }
  getCompetancyid(id:number): Observable<any>
  {
    return this.httpClient.get<Competancy[]>(`${this.baseUrl}/competancy/competancyid/${id}`)
  }
  createCompetancy(competancy: Object) : Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/competancy/create`,competancy);
  }
}
