import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { Auth2Guard } from "./services/guard2/auth2.guard";
import { CanDeactivateGuard } from "./services/deactivate-guard/can-deactivate.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolverService } from "./services/server-resolver/server-resolver.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ] },
    // Used Auth2Guard here
    // { path: 'servers', canActivate: [Auth2Guard], component: ServersComponent, children: [
    // { path: 'servers', canActivateChild: [Auth2Guard], component: ServersComponent, children: [
    { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
    // {path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!!!!'}},

    // Since this catches all the routes and redirects to PageNotFoundComponent, it must be placed at the end
    // ** is called the wild card
    {path: '**', redirectTo: '/not-found'}
  ];

@NgModule({
    imports: [
      // Using "useHash" here will add "#" to the url. e.g. localhost:4200/#/server
      // RouterModule.forRoot(appRoutes, {useHash: true})
      RouterModule.forRoot(appRoutes)

    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}