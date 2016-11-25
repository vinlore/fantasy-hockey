import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { CustomTeamComponent } from './custom-team/custom-team.component';
import { CreateTeamComponent } from './custom-team/create-team/create-team.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo:'/players' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'teams/:id', component: TeamDetailComponent },
    { path: 'custom-teams/:id', component: CustomTeamComponent, canActivate: [AuthGuard] },
    { path: 'custom-teams/create', component: CreateTeamComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }