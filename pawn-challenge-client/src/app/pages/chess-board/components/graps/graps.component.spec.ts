import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapsComponent } from './graps.component';

describe('GrapsComponent', () => {
  let component: GrapsComponent;
  let fixture: ComponentFixture<GrapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
