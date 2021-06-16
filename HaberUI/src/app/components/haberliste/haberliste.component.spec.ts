import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaberlisteComponent } from './haberliste.component';

describe('HaberlisteComponent', () => {
  let component: HaberlisteComponent;
  let fixture: ComponentFixture<HaberlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaberlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaberlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
