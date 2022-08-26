import { TestBed } from '@angular/core/testing';

import { ChessSkinService } from './chess-skin.service';

describe('ChessSkinService', () => {
  let service: ChessSkinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessSkinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
