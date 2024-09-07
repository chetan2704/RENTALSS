import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcentreComponent } from './helpcentre.component';

describe('HelpcentreComponent', () => {
  let component: HelpcentreComponent;
  let fixture: ComponentFixture<HelpcentreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpcentreComponent]
    });
    fixture = TestBed.createComponent(HelpcentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
