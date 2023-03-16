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


  // DONE
  setAsDone(currentTask: Task) {

    const toDoList: Task[] = this.getToDos();
    const id = currentTask.id;
  
    const taskToFind = toDoList.find(task => task.id === id);

    let index: number;
    taskToFind ? index = toDoList?.indexOf(taskToFind) : index = -1;
    
    currentTask.doneDate = new Date();

    toDoList.splice(index, 1);
    toDoList.push(currentTask);
    this.saveToDos(toDoList);
  }

  // UNDONE
  setAsUndone(currentTask: Task) {

    const toDoList: Task[] = this.getToDos();
    const id = currentTask.id;
  
    const taskToFind = toDoList.find(task => task.id === id);

    let index: number;
    taskToFind ? index = toDoList?.indexOf(taskToFind) : index = -1;
    
    currentTask.doneDate = null;

    toDoList.splice(index, 1);
    toDoList.push(currentTask);
    this.saveToDos(toDoList);
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

  generateId(): number {
    const toDoList = this.getToDos();
    return toDoList.length > 0 ? toDoList.length + 1 : 1;
  }

  saveToDos(tasks: Task[]): void {
    localStorage.setItem('todo', JSON.stringify(tasks))
  }

  addToList(newTask: Task): void {
    newTask.id = this.generateId();
    const toDoList = this.getToDos();
    toDoList.push(newTask);
    this.saveToDos(toDoList);
  }

  getTaskById(id: number): Task {
    const toDoList = this.getToDos();
    return toDoList.find((task: { id: number; }) => task.id === id)
  }

}
