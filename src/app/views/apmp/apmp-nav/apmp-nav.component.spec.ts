import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApmpNavComponent } from './apmp-nav.component';

describe('ApmpNavComponent', () => {
  let component: ApmpNavComponent;
  let fixture: ComponentFixture<ApmpNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApmpNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApmpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
