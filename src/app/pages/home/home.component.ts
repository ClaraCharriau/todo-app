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

  todoList!: Task[];

  nonUrgentTaskExists: boolean = false;
  urgentTaskExists: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getToDos().subscribe(todoList => this.todoList = todoList);
    if(!this.todoList) return
    this.checkTasksPriority(this.todoList);
  }

  getToDoList() {
    return this.taskService.getUnDoneTasks().subscribe(todoList => this.todoList = todoList);
  }

  checkTasksPriority(todoList: Task[]) {
    if(!this.todoList) return
    if(todoList.map(item => item.isUrgent).includes(true)) {
      this.urgentTaskExists = true;
    } else {
      this.urgentTaskExists = false;
    }
    if(todoList.map(item => item.isUrgent).includes(false)) {
      this.nonUrgentTaskExists = true;
    } else {
      this.nonUrgentTaskExists = false;
    }
  }

  setTaskAsDone(task: Task) {
    this.taskService.setAsDone(task);
    this.taskService.getToDos().subscribe(todoList => this.todoList = todoList);
    this.checkTasksPriority(this.todoList);
  }

  filterCategories(tasklist : Task[]) {
    this.todoList = tasklist;
    this.checkTasksPriority(this.todoList)
  }

}
