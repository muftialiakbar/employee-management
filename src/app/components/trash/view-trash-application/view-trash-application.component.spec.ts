import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrashApplicationComponent } from './view-trash-application.component';

describe('ViewTrashApplicationComponent', () => {
  let component: ViewTrashApplicationComponent;
  let fixture: ComponentFixture<ViewTrashApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrashApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrashApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
