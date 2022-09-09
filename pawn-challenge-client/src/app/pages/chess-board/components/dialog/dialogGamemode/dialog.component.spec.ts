import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGameModComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogGameModComponent;
  let fixture: ComponentFixture<DialogGameModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGameModComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGameModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
