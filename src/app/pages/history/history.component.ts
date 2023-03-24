import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  historyList?: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.historyList = this.getDoneList();
  }

  getDoneList() {
    return this.taskService.getDoneTasks();
  }

  setTaskUndone(task: Task) {
    this.taskService.setAsUndone(task);
    this.historyList = this.getDoneList();
  }

}
