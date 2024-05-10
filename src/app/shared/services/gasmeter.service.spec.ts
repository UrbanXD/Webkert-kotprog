import { TestBed } from '@angular/core/testing';

import { GasmeterService } from './gasmeter.service';

describe('GasmeterService', () => {
  let service: GasmeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasmeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
