import { TestBed } from '@angular/core/testing';

import { GasmeterStatesService } from './gasmeter-states.service';

describe('GasmeterStatesService', () => {
  let service: GasmeterStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasmeterStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
