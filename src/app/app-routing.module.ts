import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FormComponent } from './modules/form/form.component';
import { DownloadpdfComponent } from './shared/components/downloadpdf/downloadpdf.component';
import { LoginpageComponent } from './modules/loginpage/loginpage.component';
import { ReportManageridComponent } from './modules/report-managerid/report-managerid.component';
import { ReportProjectComponent } from './modules/report-project/report-project.component';

const routes: Routes = [
  {path:'',component: LoginpageComponent},
  {path:'home',
  component: DefaultComponent,
  children:[{
    path:'dash',
    component: DashboardComponent
  },{
   path:'form',
   component: FormComponent
},
{ path: 'reportManagerid', component: ReportManageridComponent  },
{ path: 'reportProject', component: ReportProjectComponent  }




]

},
 { path: 'home/dash/downloadPDF/:id', component: DownloadpdfComponent  },
 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
