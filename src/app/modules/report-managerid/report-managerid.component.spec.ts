import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportManageridComponent } from './report-managerid.component';

describe('ReportManageridComponent', () => {
  let component: ReportManageridComponent;
  let fixture: ComponentFixture<ReportManageridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportManageridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportManageridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
