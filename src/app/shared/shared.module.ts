import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { DownloadpdfComponent } from './components/downloadpdf/downloadpdf.component';
import { Chart1Component } from './widgets/chart1/chart1.component';
import { HighchartsChartModule }from 'highcharts-angular';
import {MatExpansionModule} from '@angular/material/expansion';
import { Chart2Component } from './widgets/chart2/chart2.component';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    DownloadpdfComponent,
    Chart1Component,
    Chart2Component
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatExpansionModule,
    

  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    DownloadpdfComponent,
    Chart1Component,
    Chart2Component,
  ]
})
export class SharedModule { }
