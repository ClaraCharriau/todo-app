import { Injectable } from '@angular/core';
import { CategoryType, Task } from 'src/app/task';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  errorMessage: any;

  url: string = "http://localhost:8080/todolist";

  constructor(private httpClient: HttpClient) { }

  /* 
  GET
  **/
  getToDos(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.url}`)
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${id}`);
  }

  // DONE
  getDoneTasks(): Observable<Task[]> {
    return this.getToDos().pipe(
      map((items: any[]) => items.filter((task) => task.doneDate)),
    );
  }
  getUnDoneTasks(): Observable<Task[]> {
    return this.getToDos().pipe(
      map((items: any[]) => items.filter((task) => task.doneDate === null)),
    );
  }

  // URGENT
  getUrgentTasks(): Observable<Task[]> {
    return this.getUnDoneTasks().pipe(
      map((items: any[]) => items.filter((task) => task.urgent)),
    );
  }
  getNonUrgentTasks(): Observable<Task[]> {
    return this.getUnDoneTasks().pipe(
      map((items: any[]) => items.filter((task) => !task.urgent)),
    );
  }

  /* 
  CREATE
  **/
  createNewTask(): Task {
    const newTask: Task = {
      id: undefined,
      content: "",
      category: null,
      isUrgent: false,
      doneDate: null
    }
    return newTask;

  }
  addToList(newTask: Task) {
    let uuid = v4();
    newTask.id = +uuid;
    this.httpClient.post<Task>(`${this.url}`, newTask).subscribe({
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error during post!', error);
      }
  })
  }


  /* 
  UPDATE
  **/
  updateTask(updatedTask: Task): void {    
    this.httpClient.patch<Task>(`${this.url}/${updatedTask.id}`, updatedTask).subscribe({
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error during update!', error);
      }
  })
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

  changeTaskContent(currentTask: Task, newContent: string): void {
    currentTask.content = newContent;
  }

  setAsDone(currentTask: Task) {
    currentTask.doneDate = new Date();
    this.updateTask(currentTask);
  }

  setAsUndone(currentTask: Task) {
    currentTask.doneDate = null;
    this.updateTask(currentTask);
  }

  /*
  DELETE
  **/
  deleteTask(taskId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}` + taskId.toString());
  }

}
