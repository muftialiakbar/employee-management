import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployee2Component } from './edit-employee2.component';

describe('EditEmployee2Component', () => {
  let component: EditEmployee2Component;
  let fixture: ComponentFixture<EditEmployee2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmployee2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployee2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
