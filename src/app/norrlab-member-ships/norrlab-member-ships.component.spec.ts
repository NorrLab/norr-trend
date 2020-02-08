import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabMemberShipsComponent } from './norrlab-member-ships.component';

describe('NorrlabMemberShipsComponent', () => {
  let component: NorrlabMemberShipsComponent;
  let fixture: ComponentFixture<NorrlabMemberShipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabMemberShipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabMemberShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
