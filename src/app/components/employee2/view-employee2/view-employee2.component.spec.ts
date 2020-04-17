import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployee2Component } from './view-employee2.component';

describe('ViewEmployee2Component', () => {
  let component: ViewEmployee2Component;
  let fixture: ComponentFixture<ViewEmployee2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmployee2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployee2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
