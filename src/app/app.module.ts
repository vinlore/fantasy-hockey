import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Custom modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth, JwtHelper } from 'angular2-jwt';

// Services
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

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
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgbModule.forRoot(),
    ],
    providers: [
        AlertService,
        AuthService,
        AuthGuard,
        AuthHttp,
        provideAuth({
            headerName: 'Authorization',
            headerPrefix: 'Bearer',
            tokenName: 'id_token',
            tokenGetter: (() => localStorage.getItem('id_token')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            noJwtError: true
        }),
        JwtHelper,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
