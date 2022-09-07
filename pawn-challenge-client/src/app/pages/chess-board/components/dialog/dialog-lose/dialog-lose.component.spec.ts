import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoseComponent } from './dialog-lose.component';

describe('DialogLoseComponent', () => {
  let component: DialogLoseComponent;
  let fixture: ComponentFixture<DialogLoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
