import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YorumComponent } from './yorum.component';

describe('YorumComponent', () => {
  let component: YorumComponent;
  let fixture: ComponentFixture<YorumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YorumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YorumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
