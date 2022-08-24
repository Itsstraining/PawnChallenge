import { TestBed } from '@angular/core/testing';

import { PieceMoveService } from './piece-move.service';

describe('PieceMoveService', () => {
  let service: PieceMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
