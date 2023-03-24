import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  urgentTasks?: Task[];
  nonUrgentTasks?: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getUrgentTasks().subscribe(urgentTasks => {this.urgentTasks = urgentTasks});
    this.taskService.getNonUrgentTasks().subscribe(nonUrgentTasks => {this.nonUrgentTasks = nonUrgentTasks});
    console.log(this.nonUrgentTasks);
    console.log(this.urgentTasks);
  }

  setTaskAsDone(task: Task) {
    this.taskService.setAsDone(task);
  }


}
