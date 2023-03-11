# 5Routing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


-------------Angular tutorial from Udemy with Maximilian-----------------
-------------Angular 8 The Complete Guide-----------------
-------------Section 11 Changing pages with Routing-----------------

1. Why do we need a Router?
    1. To navigate to the page without reloading

2. How to achive it?
    1. You can create routes in "app.module.ts"
        const appRoutes: Routes = [
        { path: '', component: HomeComponent },
        { path: 'users', component: UsersComponent },
        { path: 'servers', component: ServersComponent }
        ];
    2. Add the following in imports (To register the routes)
        RouterModule.forRoot(appRoutes)
    3. Now you need to use <router-outlet></router-outlet> where you want to load your components. Since we are loading our components in "app.component.html" we need to specify <router-outlet></router-outlet> in "app.component.html".
    4. Now we need to use
        1. routerLink : To link the path for a particular page/tab
        2. routerLinkActive: To show that the selected page is active
        3. [routerLinkActiveOptions]: In this project the home page/tab remains active even though we navigate to different tab.
        so we add [routerLinkActiveOptions] to avoid showing home page/tab to always active.  
        e.g.: <li role="presentation" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a routerLink="/      ">Home</a></li>

3. If we want to load a page on the click of a button (or in some cases after some operations) lets create a button.
    1. Created a button in "home.component.html" and added a click event to that.
        <button class="btn btn-primary" (click)="onLoadServer()">Load Servers</button>
    2. Now in "home.component.ts" we need to implement onLoadServer() method the following way:
         onLoadServer() {
            this.router.navigate(['/servers']);
        }
    3. We also need to inject Router in the same file: "home.component.ts"
        constructor(private router: Router) { }    
    4. This way we can load any page after any operation or event.

4. Absolute vs realtive path:
    1. Absolute example: this.router.navigate(['/servers']);
        This way it searches for localhost:4200/servers
        This is the right way to use.
    2. Relative example: this.router.navigate(['servers']);
        This way it searches for localhost:4200/servers/servers which does not exist
        What it is doing is, it is appending /servers to URL from wherever you are navigating.
        This is not the right way to use.

5. (11.10) This way you can pass path parameters to routes
    const appRoutes: Routes = [
        { path: 'users/:id/:name', component: UserComponent },
    ];
    1. You can catch/fetch these id and name the follwing way
        this.route.params.subscribe(
            (params: Params) => {
                this.user.id = params['id'],
                this.user.name = params['name']
                }
        )

6. (11.14) This way you can pass query parameters to routes : take a look at [queryParams], [fragment]
    In file: servers.component.html
    <a
        [routerLink]="['/servers', server.id ]"
        [queryParams]="{allowEdit: '1'}"
        [fragment]="'loading'"
        href="#"
        class="list-group-item"
        *ngFor="let server of servers">
        {{ server.name }}
      </a>
    1. You can catch/fetch these id and name the follwing way (we are trying to fetch them in edit-server.component.ts)
        this.route.queryParams.subscribe();
        this.route.fragment.subscribe();

7. (11.17) Nested Routes
    When using Nested routes you define nested routes in the following way
    const appRoutes: Routes = [
        { path: 'servers', component: ServersComponent, children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent }
        ] },
    ];

8. (11.19) When you want to handle query parameters i.e. when you are passing query parameters from parent to child and you want
   to preserve those params, you can do so by the following approach (queryParamsHandling handles the params)
     this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

9. (11.20) Handling pages which are not found and redirecting them
    1. e.g.
    {path: 'not-found', component: PageNotFoundComponent},
    {path: 'something', redirectTo: '/not-found'},
    In here, if your path has "something" for example localhost:4200/something it will get redirected to PageNotFoundComponent
    if your path has "not-found" for example localhost:4200/not-found it will load the PageNotFoundComponent
    2. If you want to catch all the incorrect routes then use the wild card: **
    {path: '**', redirectTo: '/not-found'},
    If you enter any garbage value like localhost:4200/gfhjsfgjs it will be redirected to PageNotFoundComponent

10. (11.22) Outsourcing the route configuration
    Moved the routes from "app.module.ts" to "app-routing.module.ts"
    Better approach to keep the routes separate

11. (11.21) Read the "Important Redirection Path Matching.html" file in angular course.

12. (11.24) Angular Guards: (CanActivate) and (CanActivateChild)
    With the help of Guards we can restrict access to a particular route.
    To generate a Guard: ng g g auth2
    Read auth2.guard.ts (CanActivate)
    For more info on creating a Guard: https://www.syncfusion.com/blogs/post/implementing-route-protection-in-angular-using-canactivate.aspx#:~:text=Route%20protection%20helps%20us%20in,activates%20it%20only%20if%20authorized.
    1. To protect child routes: (CanActivateChild)
    Note: provide (CanActivate) or (CanActivateChild) in the app-routing.module.ts for whichever route you want.
13. CanDeactivate
    This is used when a user is navigating to a another page without saving changes in the current page. 
    Check files: can-deactivate.guard.ts, candeactivate() in edit-server.component.ts
14. (11.28) Passing static data to Route
    app-routing.module.ts
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!!!!'}},

    We can catch the value in our component in this way
    ngOnInit() {
    // We can choose either of the options from below
    // this.errorMessage = this.route.snapshot.data['message'];
      this.route.data.subscribe(
        (data: Data) => {
          this.errorMessage = data['message'];
        }
      )
    }
15. Passing Dynamic Data to Route
    We passed dynamic data using Resolve<> (check file server-resolver.service.ts, server.component.ts, app-routing.module.ts)
    Resolve is deprecated. Need to research more.
16. (11.30) Location stategies:
    Using "useHash" here will add "#" to the url. e.g. localhost:4200/#/server
    RouterModule.forRoot(appRoutes, {useHash: true})

