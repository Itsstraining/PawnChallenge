import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayChesssComponent } from './play-chesss.component';

describe('PlayChesssComponent', () => {
  let component: PlayChesssComponent;
  let fixture: ComponentFixture<PlayChesssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayChesssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayChesssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
