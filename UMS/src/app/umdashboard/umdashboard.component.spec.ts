import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UMDashboardComponent } from './umdashboard.component';

describe('UMDashboardComponent', () => {
  let component: UMDashboardComponent;
  let fixture: ComponentFixture<UMDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UMDashboardComponent]
    });
    fixture = TestBed.createComponent(UMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
