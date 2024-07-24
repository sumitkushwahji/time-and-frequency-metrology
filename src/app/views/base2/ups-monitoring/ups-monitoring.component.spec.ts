import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsMonitoringComponent } from './ups-monitoring.component';

describe('UpsMonitoringComponent', () => {
  let component: UpsMonitoringComponent;
  let fixture: ComponentFixture<UpsMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
