import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CctvMonitoringComponent } from './cctv-monitoring.component';

describe('CctvMonitoringComponent', () => {
  let component: CctvMonitoringComponent;
  let fixture: ComponentFixture<CctvMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CctvMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CctvMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
