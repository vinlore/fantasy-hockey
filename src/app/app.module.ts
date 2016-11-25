import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Custom modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthService } from './services/auth.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Pipes
import { PaginatePipe } from './pipes/paginate.pipe';
import { TeamFilterPipe } from './pipes/team-filter.pipe';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { CustomTeamComponent } from './custom-team/custom-team.component';
import { CreateTeamComponent } from './custom-team/create-team/create-team.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        PlayersComponent,
        TeamsComponent,
        RegisterComponent,
        LoginComponent,
        PaginatePipe,
        TeamFilterPipe,
        TeamDetailComponent,
        CustomTeamComponent,
        CreateTeamComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgbModule.forRoot(),
    ],
    providers: [
        AuthService,
        AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
