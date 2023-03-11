import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server !: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // Without the following lines it is working fine, I think becoz we subscribed to params
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id)!; 
    // Instead of the follwing code we are using resolver
    /* this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id'])!; 
      }
    ); */

    // Using Resolver
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
  }

  onEdit() {
    // When we give relative path we need to specify {relativeTo: this.route} as well
    // queryParamsHandling has two values: "merge" and "preserve"
    // merge will add the existing query params and new query params
    // preserve will retain the existing query params
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
