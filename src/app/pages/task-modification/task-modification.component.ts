import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-modification',
  templateUrl: './task-modification.component.html',
  styleUrls: ['./task-modification.component.css']
})
export class TaskModificationComponent {

  currentTask?: Task;

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    this.getTask();
  }

  sendUpdateTask() {
    this.taskService.updateTask(this.currentTask!);
  }

  updateTask(updatedTask: Task) {
    this.currentTask = updatedTask;
  }

  getTask() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.currentTask = this.taskService.getTaskById(id);
  }

}
