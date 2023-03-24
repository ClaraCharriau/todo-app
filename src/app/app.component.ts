import { Component } from '@angular/core';
import { environment } from 'src/environments/environments';
import { TaskService } from './services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.title;

  constructor(private taskService: TaskService) {}

}
