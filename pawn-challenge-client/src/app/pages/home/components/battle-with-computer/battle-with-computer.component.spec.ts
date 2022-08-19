import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleWithComputerComponent } from './battle-with-computer.component';

describe('BattleWithComputerComponent', () => {
  let component: BattleWithComputerComponent;
  let fixture: ComponentFixture<BattleWithComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattleWithComputerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleWithComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
