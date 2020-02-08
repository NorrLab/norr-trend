import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabTradePublicationComponent } from './norrlab-trade-publication.component';

describe('NorrlabTradePublicationComponent', () => {
  let component: NorrlabTradePublicationComponent;
  let fixture: ComponentFixture<NorrlabTradePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabTradePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabTradePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
