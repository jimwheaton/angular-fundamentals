import { Component } from "@angular/core";
import { ForExample } from './components/for-example/for-example.component';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <passenger-viewer></passenger-viewer>
    </div>
  `
})
export class AppComponent {
}