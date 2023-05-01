import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user!: {id: number, name: string};
  paramsSubscription!: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // The following way will not work if you are trying to load the same component on which you are currently on.
    // Bcoz ngOnInit() will not be run again if you are on the same component
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    // The following way will work even though you are on the same component and trying to reload it. 
    // The following approach will work as we are subscribing and whenever the value changes it gets reflected. 
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    )
  }

  // When you leave a component, the component gets destroyed and the subscribe values as well.
  // However if you want to unsubscribe it manually, you can in the follwing way.
  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }

}
