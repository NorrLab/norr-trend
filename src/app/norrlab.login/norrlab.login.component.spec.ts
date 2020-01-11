import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Norrlab.LoginComponent } from './norrlab.login.component';

describe('Norrlab.LoginComponent', () => {
  let component: Norrlab.LoginComponent;
  let fixture: ComponentFixture<Norrlab.LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Norrlab.LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Norrlab.LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
