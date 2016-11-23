/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamService } from './team.service';

describe('Service: Teams', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamService]
    });
  });

  it('should ...', inject([TeamService], (service: TeamService) => {
    expect(service).toBeTruthy();
  }));
});
