import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrashHostComponent } from './view-trash-host.component';

describe('ViewTrashHostComponent', () => {
  let component: ViewTrashHostComponent;
  let fixture: ComponentFixture<ViewTrashHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrashHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrashHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
