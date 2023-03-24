import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  urgentTasks?: Observable<Task[]>;
  nonUrgentTasks?: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.urgentTasks = this.getUrgentTasks();
    this.nonUrgentTasks = this.getNonUrgentTasks();
  }

  getUrgentTasks(): Observable<Task[]> {
    return this.taskService.getUrgentTasks();
  }

  getNonUrgentTasks(): Observable<Task[]> {
    return this.taskService.getNonUrgentTasks();
  }

  setTaskAsDone(task: Task) {
    this.taskService.setAsDone(task);
  }


}
