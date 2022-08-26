import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSkinComponent } from './dialog-skin.component';

describe('DialogSkinComponent', () => {
  let component: DialogSkinComponent;
  let fixture: ComponentFixture<DialogSkinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSkinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
