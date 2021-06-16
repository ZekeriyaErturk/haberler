import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaberDialogComponent } from './haber-dialog.component';

describe('HaberDialogComponent', () => {
  let component: HaberDialogComponent;
  let fixture: ComponentFixture<HaberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
