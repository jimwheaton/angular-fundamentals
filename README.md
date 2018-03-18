<a href="https://ultimateangular.com" target="_blank"><img src="https://ultimateangular.com/assets/img/banners/ua-github.svg"></a>

# Angular Fundamentals Seed

> This is the seed project for the [Angular Fundamentals](https://ultimateangular.com/courses/#angular-2) course by [Todd Motto](https://twitter.com/toddmotto).

## Project Setup and Tooling

### Tools

This course is recorded with the following tools, you can optionally follow along using the same, or your favourite text editor/IDE and browser.

*Text editor*: Visual Studio Code, you can [download it here](http://code.visualstudio.com) for both Mac, Windows and Linux.
*Browser*: Google Chrome, you can [download it here](https://www.google.com/chrome)

### Prerequisites

Please make sure that you have the following installed:

* Install the _latest version_ of [Node.js](http://nodejs.org) (Mac or Windows)
  * Mac users can optionally `brew install node` if they have [brew](http://brew.sh) installed

* Node Sass, you _may_ need it if you haven't already got it installed:

```bash
npm install -g node-sass
```

### Project Install

To grab the seed project, either Fork this repo or [click here to download](https://github.com/UltimateAngular/angular-fundamentals-seed/archive/master.zip) the `.zip` folder and extract the files wherever you like on your machine.

#### Step 1: Package Manager

To install the project dependencies, you will need to install `yarn`. To install `yarn`, run the following in your terminal:

```bash
npm install -g yarn
```

Mac users can alternatively use `brew` to install `yarn`.

```bash
brew update
brew install yarn
```

If you experience any issues when installing/using `yarn` you can checkout the installation instructions [here](https://yarnpkg.com/en/docs/install).

##### Step 2: Project Dependencies

Now that we have a package manager, we can install the project dependencies. You can do this by running:

```bash
yarn install
```

This will install our dependencies for running our Angular application.

#### Step 3: Running the project

During development, the project is built using `webpack-dev-server`. This provides a local development server as well as having webpack recompile our app when a file changes. The project will also automatically refresh the page whenever we make changes.

To start the project in development, run:

```
yarn start
```

This will output some information about the project (such as the TypeScript version and build progress). Once you see "build completed", you are ready to code!

Open your browser to [localhost:4000](http://localhost:4000) to start running the code.

### Project Tooling

The project uses `webpack` to build and compile all of our assets. This will do the following for us: 

- Compile all our TypeScript code into JavaScript (starting from `main.ts` and branching outwards from imported files)
- Bundle all our JavaScript into one file to use
- Allow us to use SASS for our component's CSS files
- Provide the polyfills needed to run our app in all modern browsers
- Mock a JSON backend using [json-server](https://github.com/typicode/json-server)


# Angular Fundamentals Notes

## Architecture

#### Modules
Building blocks that contain routes, components, services, and more
#### Components
Contains a template, data and logic, forming part of a DOM tree
#### Directives 
Attach behaviour, extend, or transform a particular element and its children
##### Services
Data layer, logic that is not component related, such as API requests
#### Routing
renders a component based on the URL state, drives navigation

## Bootstrapping

- create `AppComponent`with selector `app-root`. This gets placed in `index.html` as `<app-root>`
- create `AppModule`, import `AppComponent` and tell this module to bootstrap `AppComponent`:
```javascript
// AppModule.ts
@NgModule({
  bootstrap: [AppComponent]
})
export class AppModule {}
```
- create `main.ts` and tell compiler to bootstrap our `AppModule`:
```javascript
// main.ts
platformBrowserDynamic().bootstrapModule(AppModule)
```

## Template Fundamentals

#### Property binding
- use `[]` to do one way data-binding:
```html
<!-- Will bind to 'logo' property on Component class -->
<img [src]="logo">
```
#### Event binding
- use `()` to do one event binding:
```html
<input (blur)="handleBlur($event)">
```
#### Two way data binding
Ok if you have a local component. However, when you want to emit a change, you should always use one way data flow and emit that change with an event listener.
```html
<!-- explicit -->
<input type="text" [ngModel]="name" (ngModelChange)="handleChange" />

<!-- implicit -->
<input type="text" [(ngModel)]="name" />
```
```typescript
class AppComponent {
  name: string = 'Jim'
  handleChange(value: string) {
    this.name = value;
  }
}
```

#### Template #ref variables
- allows us to create a reference to a particular DOM node which is available anywhere in our template. It essentially exports the properties of the DOM node on that variable
```html
<input type="text" #username />
<button (click)="handleClick(username.value)">Template refs!</button>
```

## Rendering Flows
- structural directives control DOM structure

#### ngIf
```html
<div *ngIf="name">Your name is {{ name }}</div>
```
- the `*` character is syntactic sugar for `<template>` (holds client side content taht is not to be rendered when a page is loaded but may subsequently be instantiated during runtime using Javascript). In Angular5, `<template>` is now `<ng-template>`. The above snippet is identical to:
```html
<template [ngIf]="name">
  <div>Your name is {{ name }}</div>
</template>
```

#### ngFor
```html
<ul>
  <li *ngFor="let passenger of passengers; let i = index;">
    {{ i + 1 }} {{ passenger.fullname }}
  </li>
</ul>
```
- this expands to
```html
<ul>
  <template ngFor let-passenger let-i="index" [ngForOf]="passengers">
    <li>
      Template {{ i + 1 }} {{ passenger.fullname }}
    </li>
  </template>
</ul>
```

#### ngClass and className
- can add `[class.my-class-name]="myBoolean"` to an element
- or can use `ngClass` to and pass object:
```html
<span ngClass="{
    'my-class-1': modelObj.isSelected,
    'my-class-2': modelObj.foo
  }"
```

#### ngStyle and style
- note the CamelCasing on `backgroundColor` because it is a javascript equivalent
```html
<span [style.backgroundColor]="#2ecc71">With style</span>
```
- or pass an object to ngStyle
```html
<span [ngStyle]="{ backgroundColor: isLate ? 'red' : 'green' }">ngStyle<span>
```

#### Pipes for data transformation
- think of them as functions that return you something new
- can chain pipes

#### Safe navigation operator
- angular concept to guard against null and undefined values in property paths.
- this is especially useful when making async calls where data won't be available right away.
```html
<span>The array has length {{ obj.myArray?.length }}</span>
```

## Component Architecture and Feature Modules

#### Container / Smart and Presentational / Dumb Components
- container components communicate with services and render child components. These are the main two things to think about when architecting angular apps
- presentational components accept data via inputs and emit data changes via event outputs

#### One way data flow
- __Golden Rule__: data flows down, events emit up

#### Feature modules with @NgModule
- as we build out features in our app, we want to package them as feature modules
- structure and naming convention
```
cool-feature ->
  components ->
    fill-buzz ->
      fizz-buzz.component.ts
  containers ->
    cool-feature ->
      cool-feature.component.ts
      cool-feature.component.scss
  models ->
    cool-feature.interface.ts
  cool-feature.module.ts
```
- in `my-cool-feature.module.ts` we need to declare our components and make sure to export them if we want them to be used in other modules:
```typescript
@NgModule({
  declarations: [
    MyCoolContainer,
    MyCoolPresentationComponent
  ],
  exports: [
    MyCoolContainer
  ]
})
```

#### Container components
- fundamental characteristics are contains things like data and renders stateless child components
- often are the only component exported from a module

#### ngOnInit lifecycle hook
- called when the component is ready.
- logic such as data fetching should be put in here, not in `constructor`. 

#### Passing data into components with @Input
- need to create property on receiving component
```typescript
import { Component, Input } from '@angular/core';

export class MyComponent {
  @Input()
  items: any[] 
}
```

#### Emitting changes with @Output and EventEmitter
- think of your component as an API. We can pass data into it, we can mutate it (immutably), then pass it back up to the parent.
```typescript
@Component({
  template: `<employee (edit)="handleEdit($event)></employee>`
})
export class EmployeeDashboard {
  handleEdit(event) {}
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'employee',
  template: `<button (click)="onEdit()`>Edit</button>
})
export class Employee {
  @Output()
  edit: EventEmitter<Employee> = new EventEmitter<Employee>();
  
  onEdit() {
    this.edit.emit(this);
  }
}
```

#### Immutable state changes
- use array functions like `filter` and `map`, since they return a new array
- use `Object.assign({}, oldObj, diffObj)` for objects
- use `ngOnChanges(changes)` hook to implement a component with local state

#### ngOnChanges lifecycle hook
- Lifecycle hook that is called when any data-bound property of a directive changes.
- __Gets called before `ngOnInit()`__. The data bindings are available at this point, so we can use this hook to make clones of any objects passed in, making it immutable. This essentially creates local state on the component.

```typescript
ngOnChanges(changes) {
  if (changes.myProp) {
    this.myProp = Object.assign({}, changes.myProp.currentValue)
  }
}
```

## Services, Http and Observables

#### Data Services and Dependency Injection
- services must be declared in `@NgModule` in the `providers` array:
```typescript
import { MyService } from './services/my-service';

@NgModule({
  providers: [MyService]
})
```
- services are injected through constructor. There is a shorthand for assigning a service to an instance variable:
```typescript
constructor(private service: MyService) {} //creates a this.service variable
```

#### @Injectable
- tells angular that whatever is decorated can have dependencies injected. This is useful for services that have dependencies (or as best practice / consistency, used with ALL services)
```typescript
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MyService {
  constructor(private http: Http) {}
}
```

#### Http data fetching, updating, and deleting with Observables
- In Angular5, `Http` is now `HttpClient`
- in the service wrapping `Http`, we'll be returning `rxjs/Observables`.
- in the comsuming components, we may need to make use of the Safe Navigation Operator (`?`) to deal with undefined/null before aync call has finished
```typescript
import { Http, Response } from "@angular/http";
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

...
  getData(): Observable<MyModel[]> {
    return this.http
      .get('api/somedata')
      .map((response: Response) => response.json());
  }
  
  updateData(someData: MyModel): Observable<MyModel> {
    return this.http
      .put('api/somedata/${someData.id}', someData)  // ' should be backticks
      .map((response: Response) => response.json());
  }
  
  deleteData(someData: MyModel): Observable<MyModel> {
    return this.http
      .delete('api/somedata/${someData.id}')
      .map((response: Response) => response.json());
  }
```

#### Observable.catch error handling
```typescript
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
...
  getData(): Observable<MyModel[]> {
    return this.http
      .get('api/somedata')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
...

```
- then in consumer
```typescript
  this.myService
      .getData()
      .subscribe(
        (data: Passenger[]) => this.passengers = data,
        (error: any) => console.log('boom')
      );
```

#### Custom Headers and RequestOptions
```typescript
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

...
  updateData(someData: MyModel): Observable<MyModel> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http
      .put('api/somedata/${someData.id}', someData, options)  // ' should be backticks
      .map((response: Response) => response.json());
  }
...
```
#### Http Promises alternative
- recommend using Observables over Promises, but if you want to this is how:
```typescript
import 'rxjs/add/operator/toPromise';

...
  getData(): Promise<MyModel[]> {
    return this.http
      .get('api/somedata')
      .toPromise()
      .then((response: Response) => response.json());
  }
```

## Template-driven Forms
- on a `<form>` element, use a template ref to reference `ngForm`, which is a directive which keeps track of all of the state changes and all of the validation of the form inputs:
```html
<form #myForm="ngForm" novalidate>
  {{ myForm.value | json }}
</form>
```
- on an input element, we can use a template ref to reference `ngModel`, which also keeps track of validation for an input. We add validation to the input such as `required` and Angular will automatically tie this into `ngModel`:
```html
<input 
  type="text" 
  #myInput="ngModel"
  required>
{{ myInput.errors | json }}
```
- setting the `name` attribute on a control will add it to the form template model:
```html
<input name="firstName">
{{ myForm.firstName }}
```
- in a template driven form, __the template is the source of truth__, not your data model
- `ngModel` can be set on the input controls to bind the input value to a model value

#### Input
```html
<input type="text" name="firstName" [ngModel]="employee?.firstName">
```

#### Radio
- radio inputs with the same `name` will form a group
```html
<div>
  <label>
    <input 
      type="radio" 
      name="fullTime"
      [value]="true"
      [ngModel]="employee?.fullTime"
      (ngModelChange)="toggleFullTime($event)">
      Full-time
  </label>
  <label>
    <input 
      type="radio" 
      name="fullTime"
      [value]="false"
      [ngModel]="employee?.fullTime"
      (ngModelChange)="toggleFullTime($event)">
      Part-time
  </label>
</div> 
```

#### Checkbox
```html
<label>
  <input 
    type="checkbox" 
    name="fullTime"
    [ngModel]="employee?.fullTime"
    (ngModelChange)="toggleFullTime($event)">
    Full-time
</label>
```

#### Select
- two approaches for setting selected option. Option 1 is more explicit (recommended). `ngValue` is short-hand for option 1
```typescript
class EmployeeEditor {
  genders: Gender[] = [{
    key: 'male',
    value: 'Male'
  } ... ]
}
```
```html
Option 1
<select 
  name="gender"
  [ngModel]="employee?.gender">
  <option
    *ngFor="let gender of genders"
    [value]="gender.key"
    [selected]="gender.key === employee?.gender">
    {{ gender.value }}
  </option>
</select>

Option 2
<select 
  name="gender"
  [ngModel]="employee?.gender">
  <option
    *ngFor="let gender of genders"
    [ngValue]="gender.key">
    {{ gender.value }}
  </option>
</select>
```
#### Validation
```html
<form #form="ngForm" novalidate>
  <input 
    type="text"
    name="fullname"
    required
    #fullname="ngModel"
    [ngModel]="person?.fullname">
  <div 
    *ngIf="fullname.errors?.required && fullname.dirty"
    class="error">
    Passenger name is required
  </div>

  <button type="submit" [disabled]="form.invalid">
    Update passenger
  </button>
</form>
```

#### Form submission
```html
<form
  #form="ngForm"
  novalidate
  (ngSubmit)="handleSubmit(form.value, form.isValid)">
  ...
```
```typescript
class MyClass  
  
  @Output()
  update: EventEmitter<MyModel> = new EventEmitter<MyModel>();
  
  handleSubmit(myModel: MyModel, isValid: boolean) {
    if (isValid) {
      this.update.emit(myModel)
    }
  }
```

## Component Routing
- Need to include `<base>` tag in `index.html` for routing to work:
```html
<!DOCTYPE HTML>
<html>
  <head>
    <base href="/">
    ...
```
#### Root module routes and outlet
- configure routing in `AppModule`
```typescript
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppModule {}
```
- add `<router-outlet>` to `AppComponent`
```typescript
@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <router-outlet></router-outlet>
    </div>
  `
})
```
#### Routerlink
- on `/` route, specify exact match, otherwise it will match all routes
- `routerLinkActive` specifies the active CSS class, which is dynamically added when the route is active
```html
<nav class="nav">
  <a
    routerLink="/"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{ exact: true }">
    Home
  </a>
  <a
    routerLink="/employees"
    routerLinkActive="active">
    Employees
  </a>
```
- a better approach is to dynamically build nav
```typescript
interface Nav {
  link: string,
  name: string,
  exact: boolean
};

@Component({
  selector: 'app-root',
  template: `
    <nav class="nav">
      <a
        *ngFor="let item of nav"
        [routerLink]="item.link"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: item.exact }">
        {{ item.name }}
      </a>
  `
})
export class AppComponent {
  nav: Nav[] = [
    {
      link: '/',
      name: 'Home',
      exact: true
    },
    {
      link: '/employees',
      name: 'Employees',
      exact: false
    }
  ];
}
```
#### Feature module routes with forChild()
- in feature module, define routes. You may be able to drop all the exports because parent componet will likely not be rendering child components explictly and instead will rely on the router to populate `<router-outlet>`
```typescript
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'employees', 
    children: [
      { path: '', component: EmployeeDashboardComponent },
      { path: ':id', component: EmployeeViewerComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class EmployeeModule {}
```
- to use the route params with data-fetching, use `switchMap`, which will switch to the inner observable whenever the outer observable emits an event
```typescript
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
...
})
export class EmployeeViewComponent {
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}
  
  ngOnInit() {
    this.route.params
      .switchMap((data: Employee) => this.employeeService.getPassenger(data.id))
      .subscribe((data: Employee) => this.employee = data);
  }
}
```
#### Imperative routing API
- stateless component emits an event, for example when clicking on 'View'
```typescript
@Component({
  selector: 'employee-summary',
  template: `
    <button (click)="viewEmployee()">View</button>
  `
})
export class EmployeeSummaryComponent {
  @Input()
  employee: Employee
  
  @Output()
  view: EventEmitter<Employee> = new EventEmitter<Employee>();
  
  viewEmployee() {
    this.view.emit(this.employee);
  }
}
```
- container component subscribes to this event and explictly calls router
```typescript
@Component({
  selector: 'employee-dashboard',
  template: `
    <employee-summary
      (view)="onViewEmployee($event)">
    </employee-summary>
  `
})
export class EmployeeDashboardComponent() {
  constructor(private router: Router) {}
  
  onViewEmployee(event: Employee) {
    this.router.navigate(['/employees', event.id]);
  }
}
```
#### Hash location strategy vs push location strategy
- enable by specifying `RouterModule.forRoot(routes, { useHash: true })`
- "push" requires server side configuration, but sets us up to use server side rendering ("hash" strategy doesn't support this)
- "push" uses `history.pushState()`
- "hash" supports older browsers

#### Redirects
```typescript
const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full'}
]
```