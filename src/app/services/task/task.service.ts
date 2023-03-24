import { Injectable } from '@angular/core';
import { CategoryType, Task } from 'src/app/task';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly url = "http://localhost:8080"

  readonly endpoint = "/todolist"

  constructor(private httpClient: HttpClient) { }

  /* 
  GET
  **/
  getToDos(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url.toString() + this.endpoint.toString());
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this.url.toString() + this.endpoint.toString() + `${id}`);
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
    newTask.id = this.generateId();
    console.log(newTask.id);
    this.httpClient.post<Task>(this.url.toString() + this.endpoint.toString(), newTask);
  }

  getTodoLength(): number {
    this.getToDos().pipe(map((array: Task[]) => Array.length))
    return 
  }
  

  generateId(): number {
    let todolistlength = 0;
    todolistlength = 
    return todolistlength > 0 ? todolistlength + 1 : 1;
  }

  /* 
  UPDATE
  **/
  updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient.patch<Task>(this.url.toString() + this.endpoint.toString(), updatedTask);
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
    const id = currentTask.id;
    this.deleteTask(id!);
    currentTask.doneDate = new Date();
    this.addToList(currentTask);
  }

  setAsUndone(currentTask: Task) {
    const id = currentTask.id;
    currentTask.doneDate = null;
    this.deleteTask(id!);
    this.addToList(currentTask);
  }

  /*
  DELETE
  **/
  deleteTask(taskId: number): Observable<void> {
    console.log('supprimer ' + taskId);
    return this.httpClient.delete<void>(this.url.toString() + this.endpoint.toString() + `/`+ taskId.toString());
  }

}
