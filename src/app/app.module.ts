import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Custom modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Services
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        PlayersComponent,
        TeamsComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
