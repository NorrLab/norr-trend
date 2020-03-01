import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabUserComponent } from './norrlab-user.component';

describe('NorrlabUserComponent', () => {
  let component: NorrlabUserComponent;
  let fixture: ComponentFixture<NorrlabUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
