import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealGraphComponent } from './real-graph.component';

describe('RealGraphComponent', () => {
  let component: RealGraphComponent;
  let fixture: ComponentFixture<RealGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
