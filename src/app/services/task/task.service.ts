import { Injectable } from '@angular/core';
import { CategoryType, Task } from 'src/app/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  createNewTask(): Task {
    const newTask: Task = {
      id : undefined,
      content: "",
      category: null,
      isUrgent: false,
      doneDate: null
    }
    return newTask;
  }

  changeTaskCategory(currentTask: Task, categorySelected: string): void {
    const newCategory = categorySelected as CategoryType;
    currentTask.category = newCategory;
  }

  changeTaskPriority(currentTask: Task): void {
    let isUrgent = currentTask.isUrgent;
    isUrgent ? isUrgent = false : isUrgent = true;
    currentTask.isUrgent = isUrgent;
  }

  // LocalStorage
  createToDoStorage() {
    const toDoStorage = JSON.stringify([]);
    localStorage.setItem('todo', toDoStorage);
  }

  getToDos() {
    const toDoList = localStorage.getItem('todo');
    if(toDoList) {
      return JSON.parse(toDoList);
    } else {
      this.createToDoStorage();
      this.getToDos();
    }
  }

  saveToDos(tasks: Task[]) {
    localStorage.setItem('todo', JSON.stringify(tasks))
  }

  addToList(newTask: Task) {
    const toDoList = this.getToDos();
    toDoList.push(newTask);
    this.saveToDos(toDoList);
  }





}
