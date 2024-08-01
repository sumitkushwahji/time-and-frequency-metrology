import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingValueGraphComponent } from './missing-value-graph.component';

describe('MissingValueGraphComponent', () => {
  let component: MissingValueGraphComponent;
  let fixture: ComponentFixture<MissingValueGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingValueGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingValueGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
