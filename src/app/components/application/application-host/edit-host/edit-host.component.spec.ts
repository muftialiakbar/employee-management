import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHostComponent } from './edit-host.component';

describe('EditHostComponent', () => {
  let component: EditHostComponent;
  let fixture: ComponentFixture<EditHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
