import { Component } from '@angular/core';

interface Child {
    name: string,
    age: number
}

interface Passenger {
    id: number,
    fullname: string,
    checkedIn: boolean,
    checkInDate?: number,
    children: Child[] | null
};

@Component({
    selector: 'for-example',
    styleUrls: ['for-example.component.scss'],
    template: `
        <div class="app">
            <h3>Airline Passengers</h3>
            <ul>
                <li *ngFor="let passenger of passengers; let i = index;">
                    <span 
                        class="status"
                        [class.checked-in]="passenger.checkedIn"></span>
                    {{ i + 1 }} {{ passenger.fullname }}
                    <p>{{ passenger | json }}</p>
                    <div class="date">
                        Check in date:
                        {{ passenger.checkInDate ? (passenger.checkInDate | date: 'yMMMd' | uppercase) : 'Not checked in' }}
                    </div>
                    <div class="children">
                        Children: {{ passenger.children?.length || 0 }}
                    </div>
                </li>
            </ul>
            <h3>Airline passensgers ngClass</h3>
            <ul>
                <li *ngFor="let passenger of passengers; let i = index;">
                    <span 
                        class="status"
                        [ngClass]="{ 
                            'checked-in': passenger.checkedIn,
                            'checked-out': !passenger.checkedIn 
                        }"></span>
                    {{ i + 1 }} {{ passenger.fullname }}
                </li>
            </ul>

            <h3>Airline passensgers [style]</h3>
            <ul>
                <li *ngFor="let passenger of passengers; let i = index;">
                    <span 
                        class="status"
                        [style.backgroundColor]="(passenger.checkedIn ? '#2ecc71' : '#c0392b')"></span>
                    {{ i + 1 }} {{ passenger.fullname }}
                </li>
            </ul>

            <h3>Airline passensgers [ngStyle]</h3>
            <ul>
                <li *ngFor="let passenger of passengers; let i = index;">
                    <span 
                        class="status"
                        [ngStyle]="{
                            backgroundColor: (passenger.checkedIn ? '#2ecc71' : '#c0392b')
                        }"></span>
                    {{ i + 1 }} {{ passenger.fullname }}
                </li>
            </ul>
        </div>
    `
})
export class ForExample extends Component {
    passengers: Passenger[] = [
        {
            id: 1,
            fullname: 'Stephen',
            checkedIn: true,
            checkInDate: 1490742000000,
            children: null
        },
        {
            id: 2,
            fullname: 'Rose',
            checkedIn: false,
            children: [
                { name: 'Jessica', age: 1}
            ]
        },
        {
            id: 1,
            fullname: 'Joe',
            checkedIn: true,
            checkInDate: 1490742000000,
            children: [
                { name: 'Jessica', age: 1}, 
                { name: 'Sue', age: 12 }
            ]
        },
        {
            id: 1,
            fullname: 'Holly',
            checkedIn: true,
            checkInDate: 1490742000000,
            children: null
        }
    ]
}

