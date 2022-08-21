import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnChessComponent } from './learn-chess.component';

describe('LearnChessComponent', () => {
  let component: LearnChessComponent;
  let fixture: ComponentFixture<LearnChessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnChessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
