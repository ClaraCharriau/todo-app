import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css']
})
export class TaskCreationComponent {
  
categoryType: string[] = ["shopping", "health", "work", "bills", "cleaning", "other"];

currentTask?: Task;

constructor(private taskService: TaskService) {}

ngOnInit() {
  this.createNewTask();
  console.log(this.currentTask);
}

createNewTask() {
  this.currentTask = this.taskService.createNewTask();
}

validateTask() {
  this.taskService.addToList(this.currentTask!);
}

chooseCategory(category: string) {
  this.taskService.changeTaskCategory(this.currentTask!, category);
  console.log(this.currentTask);
}

changePriority() {
  this.taskService.changeTaskPriority(this.currentTask!);
}

}
