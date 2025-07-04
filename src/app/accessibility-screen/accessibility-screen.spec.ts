import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityScreen } from './accessibility-screen';

describe('AccessibilityScreen', () => {
  let component: AccessibilityScreen;
  let fixture: ComponentFixture<AccessibilityScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibilityScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibilityScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
