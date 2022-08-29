import { TestBed } from '@angular/core/testing';

import { HistoryMoveService } from './history-move.service';

describe('HistoryMoveService', () => {
  let service: HistoryMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
