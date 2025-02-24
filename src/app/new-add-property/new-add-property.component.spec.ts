import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddPropertyComponent } from './new-add-property.component';

describe('NewAddPropertyComponent', () => {
  let component: NewAddPropertyComponent;
  let fixture: ComponentFixture<NewAddPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAddPropertyComponent]
    });
    fixture = TestBed.createComponent(NewAddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
