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
    return this.httpClient.get<Task[]>(this.url + this.endpoint);
  }
  getTaskById(id: number): Observable<Task> {
    return this.getToDos().pipe(
      map((items: any[]) => items.find((item: { id: number; }) => item.id === id)),
    );
  }
  getDoneTasks(): Observable<Task[]> {
    return this.getToDos().pipe(
      map((items: any[]) => items.filter((task: { doneDate: null; }) => task.doneDate !== null)),
    );
  }
  getUnDoneTasks(): Observable<Task[]> {
    return this.getToDos().pipe(
      map((items: any[]) => items.filter((task: { doneDate: null; }) => task.doneDate === null)),
    );
  }
  getUrgentTasks(): Observable<Task[]> {
    return this.getToDos().pipe(
      map((items: any[]) => items.filter((task: { doneDate: null; }) => task.doneDate !== null)),
    );
  }
  getNonUrgentTasks(): Observable<Task[]> {
    return this.getToDos().pipe(
      map((items: any[]) => items.filter((task: { isUrgent: boolean; }) => task.isUrgent === false)),
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
  addToList(newTask: Task): Observable<Task> {
    newTask.id = this.generateId();
    return this.httpClient.post<Task>(this.url + this.endpoint, newTask);
  }
  generateId(): number {
    let taskList: Task[] = [];
    this.getToDos().subscribe(toDoList => taskList = toDoList);
    return taskList.length > 0 ? taskList.length + 1 : 1;
  }

  /* 
  UPDATE
  **/
  updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient.patch<Task>(this.url + this.endpoint, updatedTask);
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
    return this.httpClient.delete<void>(this.url + this.endpoint + '/${taskId}');
  }

}
