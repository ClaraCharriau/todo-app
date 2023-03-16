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

  nonUrgentTaskExists: boolean = false;
  urgentTaskExists: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.todoList = this.getToDoList();
    this.checkTasksPriority();
  }

  getToDoList(): Task[] {
    const allTasks = this.taskService.getToDos();
    const filterTasks = allTasks.filter((task: { doneDate: null; }) => task.doneDate === null);
    return filterTasks;
  }

  checkTasksPriority() {
    if(this.todoList.length > 0 && this.todoList.map(item => item.isUrgent).includes(true)) {
      this.urgentTaskExists = true;
    }
    if(this.todoList.length > 0 && this.todoList.map(item => item.isUrgent).includes(false)) {
      this.nonUrgentTaskExists = true;
    }
  }

  setTaskAsDone(task: Task) {
    this.taskService.setAsDone(task);
    this.todoList = this.getToDoList();
  }

}
