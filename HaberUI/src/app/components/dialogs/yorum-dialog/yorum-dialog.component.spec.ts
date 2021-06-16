import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YorumDialogComponent } from './yorum-dialog.component';

describe('YorumDialogComponent', () => {
  let component: YorumDialogComponent;
  let fixture: ComponentFixture<YorumDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YorumDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YorumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
