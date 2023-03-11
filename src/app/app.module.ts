import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule  } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from 'src/app/services/guard2/auth.service';
import { Auth2Guard } from './services/guard2/auth2.guard';
import { CanDeactivateGuard } from './services/deactivate-guard/can-deactivate.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

/* Moved these routes to app-routing.module.ts */
/* const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent },
  ] },
  { path: 'servers', component: ServersComponent, children: [
    { path: ':id', component: ServerComponent },
    { path: ':id/edit', component: EditServerComponent }
  ] },
  {path: 'not-found', component: PageNotFoundComponent},
  // Since this catches all the routes and redirects to PageNotFoundComponent, it must be placed at the end
  // ** is called the wild card
  {path: '**', redirectTo: '/not-found'},

]; */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ServersService, AuthService, Auth2Guard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
