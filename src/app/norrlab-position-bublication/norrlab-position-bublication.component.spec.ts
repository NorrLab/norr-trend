import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabPositionBublicationComponent } from './norrlab-position-bublication.component';

describe('NorrlabPositionBublicationComponent', () => {
  let component: NorrlabPositionBublicationComponent;
  let fixture: ComponentFixture<NorrlabPositionBublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabPositionBublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabPositionBublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
