import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrLabSnackBarComponentComponent } from './norr-lab-snack-bar-component.component';

describe('NorrLabSnackBarComponentComponent', () => {
  let component: NorrLabSnackBarComponentComponent;
  let fixture: ComponentFixture<NorrLabSnackBarComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrLabSnackBarComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrLabSnackBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
