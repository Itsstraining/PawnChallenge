import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInviteComponent } from './dialog-invite.component';

describe('DialogInviteComponent', () => {
  let component: DialogInviteComponent;
  let fixture: ComponentFixture<DialogInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
