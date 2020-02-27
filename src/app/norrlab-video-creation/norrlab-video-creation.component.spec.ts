import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabVideoCreationComponent } from './norrlab-video-creation.component';

describe('NorrlabVideoCreationComponent', () => {
  let component: NorrlabVideoCreationComponent;
  let fixture: ComponentFixture<NorrlabVideoCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabVideoCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabVideoCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
