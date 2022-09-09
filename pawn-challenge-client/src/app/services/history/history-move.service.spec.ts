import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history-move.service';

describe('HistoryMoveService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
