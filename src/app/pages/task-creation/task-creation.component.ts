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

constructor(private taskService: TaskService, private route: Router) {}

  ngOnInit() {
    this.createNewTask();
  }

  createNewTask() {
    this.currentTask = this.taskService.createNewTask();
  }
  

validateTask() {
  this.taskService.addToList(this.currentTask!);
  this.route.navigate(['/']);
}

chooseCategory(category: string) {
  this.taskService.changeTaskCategory(this.currentTask!, category);
  console.log(this.currentTask);
}

changePriority() {
  this.taskService.changeTaskPriority(this.currentTask!);
}

}
