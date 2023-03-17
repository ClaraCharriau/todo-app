import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent {

  currentTask?: Task;

  constructor(private taskService: TaskService, private route: Router) { }

  ngOnInit() {
    this.createNewTask();
    console.log(this.currentTask);
  }

  createNewTask() {
    this.currentTask = this.taskService.createNewTask();
  }

  updateTask(updatedTask: Task) {
    this.currentTask = updatedTask;
    console.log(this.currentTask);
  }

  validateTask() {
    this.taskService.addToList(this.currentTask!);
    this.route.navigate([""]);
  }

}
