import { Component, OnInit, Input } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form #form="ngForm" novalidate>
      <div>{{ detail | json }}</div>
      Passenger name:
      <input 
        type="text"
        name="fullname"
    </form>
  `
})
export class PassengerFormComponent implements OnInit {
  @Input()
  detail: Passenger;
  constructor() { }

  ngOnInit() { }
}