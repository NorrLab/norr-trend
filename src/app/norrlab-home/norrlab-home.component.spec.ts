import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabHomeComponent } from './norrlab-home.component';

describe('NorrlabHomeComponent', () => {
  let component: NorrlabHomeComponent;
  let fixture: ComponentFixture<NorrlabHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
