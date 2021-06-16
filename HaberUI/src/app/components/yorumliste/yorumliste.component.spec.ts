import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YorumlisteComponent } from './yorumliste.component';

describe('YorumlisteComponent', () => {
  let component: YorumlisteComponent;
  let fixture: ComponentFixture<YorumlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YorumlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YorumlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
