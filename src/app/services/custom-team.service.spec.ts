/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomTeamService } from './custom-team.service';

describe('Service: CustomTeam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomTeamService]
    });
  });

  it('should ...', inject([CustomTeamService], (service: CustomTeamService) => {
    expect(service).toBeTruthy();
  }));
});
