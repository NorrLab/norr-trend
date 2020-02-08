import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorrlabVideoChannelComponent } from './norrlab-video-channel.component';

describe('NorrlabVideoChannelComponent', () => {
  let component: NorrlabVideoChannelComponent;
  let fixture: ComponentFixture<NorrlabVideoChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorrlabVideoChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorrlabVideoChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
