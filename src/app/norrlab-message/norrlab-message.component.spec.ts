import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabMessageComponent } from './norrlab-message.component';

describe('NorrlabMessageComponent', () => {
  let component: NorrlabMessageComponent;
  let fixture: ComponentFixture<NorrlabMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
