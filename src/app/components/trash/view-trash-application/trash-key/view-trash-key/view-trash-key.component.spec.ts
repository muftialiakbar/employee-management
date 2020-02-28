import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrashKeyComponent } from './view-trash-key.component';

describe('ViewTrashKeyComponent', () => {
  let component: ViewTrashKeyComponent;
  let fixture: ComponentFixture<ViewTrashKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrashKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrashKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
