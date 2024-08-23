import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncClocksComponent } from './sync-clocks.component';

describe('SyncClocksComponent', () => {
  let component: SyncClocksComponent;
  let fixture: ComponentFixture<SyncClocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyncClocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncClocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
