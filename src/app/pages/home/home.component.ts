import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  todoList: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.todoList = this.taskService.getToDos();
  }


}
