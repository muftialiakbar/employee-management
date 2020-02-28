import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationHostComponent } from './view-application-host.component';

describe('ViewApplicationHostComponent', () => {
  let component: ViewApplicationHostComponent;
  let fixture: ComponentFixture<ViewApplicationHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApplicationHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
