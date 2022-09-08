import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnChesssComponent } from './learn-chesss.component';

describe('LearnChesssComponent', () => {
  let component: LearnChesssComponent;
  let fixture: ComponentFixture<LearnChesssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnChesssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnChesssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
