import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabAccountManagerComponent } from './norrlab-account-manager.component';

describe('NorrlabAccountManagerComponent', () => {
  let component: NorrlabAccountManagerComponent;
  let fixture: ComponentFixture<NorrlabAccountManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabAccountManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabAccountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
