import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationKeyComponent } from './view-application-key.component';

describe('ViewApplicationKeyComponent', () => {
  let component: ViewApplicationKeyComponent;
  let fixture: ComponentFixture<ViewApplicationKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApplicationKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
