import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KullanicilisteComponent } from './kullaniciliste.component';

describe('KullanicilisteComponent', () => {
  let component: KullanicilisteComponent;
  let fixture: ComponentFixture<KullanicilisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullanicilisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullanicilisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
