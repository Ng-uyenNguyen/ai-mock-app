import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { mockTasksData } from '../mock-data/task.mock-data';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() { }
  mockTasks = mockTasksData;
  getTasks(): Observable<Task[]> {
    // Simulate API call with delay
    return of(this.mockTasks).pipe(delay(1500));
  }
}