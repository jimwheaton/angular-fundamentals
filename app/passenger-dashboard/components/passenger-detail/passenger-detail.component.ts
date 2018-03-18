import {
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit,
  OnChanges
} from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span 
        class="status"
        [class.checked-in]="detail.checkedIn">
      </span>
      <div *ngIf="editing">
        <input 
          type="text" 
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>
      <div class="date">
        Check in date:
        {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMd' | uppercase) : 'Not checked in' }}
      </div>
      <button (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit' }}
      </button>
      <button (click)="onRemove()">
        Remove
      </button>
      <button (click)="gotoPassenger()">
        View
      </button>
    </div>
  `
})
export class PassengerDetailComponent implements OnInit, OnChanges {
  @Input()
  detail: Passenger;

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  editing: boolean = false;

  ngOnInit() {
    console.log('onInit');
  }

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue)
    }
    console.log('onChanges');
  }

  onNameChange(value: string) {
    this.detail.fullname = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  gotoPassenger() {
    this.view.emit(this.detail);
  }

  onRemove() {
    this.remove.emit(this.detail);
  }
}