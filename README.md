![miniature-readme](https://user-images.githubusercontent.com/101406252/228045062-076d1b46-0381-4453-b7dd-230e1aa84b52.jpg)

# 📝 Todo Application

Users will find their todo list on a homepage, displayed according to their priority, it's also possible to filter according to the tasks categories.
The users can create new tasks by clicking on the "+" button. When tasks are done, clicking on them transfer them to the history list. A task can be modified by clicking on them on the home page.

### Production : https://clara-to-do-app.netlify.app

### 📍 Homepage

The browser will search for existing todo's in his **LocalStorage**. The todo are sorted and displayed according to their priority thanks to **Angular's ngIf and ngFor directives**. If there is no task, a button suggest to create a new one.

By clicking on a task, the user can modify it. Clicking on the checkbox’s task sends it to the history.

The category’s emojis are displayed through a **custom pipe**.

On the top of the page, users can filter tasks by categories with **filter()** method.

### 📍 Task creation & modification 

To optimize the number of components, the form that create and modify tasks is the same. This component is reused on the "creation" page where it creates a new task and on the "modification" page where it allows to modify the task thanks to the **navigation by parameter** in the url.

The button stays disabled if the category isn’t selected or if the content remains empty. The style of the button changes according to the Angular attribute **[disabled]**.

By clicking on the button, the current task is sent to the browser’s **LocalStorage**.

### 📍 Task JSON structure

```json
    {
        "id": "0464c4ee-9f34-492a-bc6f-f105ca841c30",
        "content": "responds to urgent emails",
        "category": "work",
        "urgent": true,
        "doneDate": "2023-03-24T10:39:28.977Z"
    }
```

### 📍 History

Once a task is done, it keeps its date of completion in 'doneDate' and is arranged in chronological order in the history page. If there is no task, a button suggest to create a new one.

Clicking on a task returns it to the homepage. 

### 📍 API connexion

On the main branch of this project, the tasks are stored in the browser's localstorage. On the `test/api` branch, the Task service sends HTTP requests to a REST API and can retrieve tasks from a database.
The backend of the application can be found here : https://github.com/ClaraCharriau/todo-app-service

### 📍 UI

The design of the application was proposed by our instructor during our Angular course at Simplon.

## Environment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

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
