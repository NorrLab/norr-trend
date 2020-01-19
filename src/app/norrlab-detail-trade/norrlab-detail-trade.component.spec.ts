import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabDetailTradeComponent } from './norrlab-detail-trade.component';

describe('NorrlabDetailTradeComponent', () => {
  let component: NorrlabDetailTradeComponent;
  let fixture: ComponentFixture<NorrlabDetailTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabDetailTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabDetailTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
