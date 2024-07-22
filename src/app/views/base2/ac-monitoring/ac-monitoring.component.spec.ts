import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcMonitoringComponent } from './ac-monitoring.component';

describe('AcMonitoringComponent', () => {
  let component: AcMonitoringComponent;
  let fixture: ComponentFixture<AcMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
