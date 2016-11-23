import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TeamService } from '../services/team.service';

import { Team } from '../models/team';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
  providers: [TeamService],
})
export class TeamDetailComponent implements OnInit {

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

}
