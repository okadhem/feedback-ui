import { TestBed, async, inject } from '@angular/core/testing';

import { AuthgardGuard } from './authgard.guard';

describe('AuthgardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthgardGuard]
    });
  });

  it('should ...', inject([AuthgardGuard], (guard: AuthgardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
