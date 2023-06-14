import { TestBed } from '@angular/core/testing';

import { SpoonacualarService } from './spoonacualar.service';

describe('SpoonacualarService', () => {
  let service: SpoonacualarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpoonacualarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
