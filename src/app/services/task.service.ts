import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseApiUrl = 'http://localhost:3000/tasks'; //Endpoint
  constructor(private http: HttpClient) { }

  getTaskList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseApiUrl)
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseApiUrl}/${id}`)
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseApiUrl, task)
  }
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseApiUrl}/${task.id}`, task)
  }
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/${id}`)
  }

}
