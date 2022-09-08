import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogToCaptureComponent } from './dialog-to-capture.component';

describe('DialogToCaptureComponent', () => {
  let component: DialogToCaptureComponent;
  let fixture: ComponentFixture<DialogToCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogToCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogToCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
