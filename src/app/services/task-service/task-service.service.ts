import { Injectable } from '@angular/core';
import { Task } from 'src/app/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  toDoList: Task[] = [];

  add(task: Task) {
    this.toDoList.push(task);
  }

}
