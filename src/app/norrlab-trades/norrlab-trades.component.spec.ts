import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabTradesComponent } from './norrlab-trades.component';

describe('NorrlabTradesComponent', () => {
  let component: NorrlabTradesComponent;
  let fixture: ComponentFixture<NorrlabTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
