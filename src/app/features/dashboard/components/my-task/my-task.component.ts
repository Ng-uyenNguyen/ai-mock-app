import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  allTask: Task[] = [];
  toDo: Task[] = [];
  inProgress: Task[] = [];
  completed: Task[] = [];
  loading: { [key: number]: boolean } = {};
  isLoadingTasks: boolean = true;
  constructor(private snackBar: MatSnackBar, private taskService: TaskService) {
  }

  ngOnInit() {
    this.loadAllTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateTaskStatus(task, event.container.id as TaskStatus);
    }
  }

  updateTaskStatus(task: Task, newStatus: TaskStatus) {
    this.loading[task.id] = true;
    // Simulating an API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (!isSuccess) {
        // Simulating a failure scenario
        this.loading[task.id] = false;
        this.snackBar.open('Failed to update task status. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-100', 'text-red-900']
        });
        // Revert the task to its original position
        this.revertTaskPosition(task, newStatus);
      } else {
        task.status = newStatus;
        this.loading[task.id] = false;
        this.snackBar.open('Task status updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['bg-green-100', 'text-green-900']
        });
      }
    }, 1000);
  }

  revertTaskPosition(task: Task, newStatus: TaskStatus) {
    const sourceList = this[task.status];
    const targetList = this[newStatus];
    const taskIndex = targetList.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      transferArrayItem(targetList, sourceList, taskIndex, sourceList.length);
    }
  }

  getColumnColor(status: string): string {
    switch (status) {
      case 'toDo':
        return 'bg-gray-100';
      case 'inProgress':
        return 'bg-yellow-100';
      case 'completed':
        return 'bg-green-100';
      default:
        return 'bg-white';
    }
  }

  loadAllTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.allTask = tasks;
        this.categorizeTask();
        this.isLoadingTasks = false;
      },
      error: (err) => {
        console.log("Failed to load tasks. Please try again.", err);
      }
    });
  }

  categorizeTask() {
    this.toDo = this.allTask.filter(task => task.status === TaskStatus.toDo);
    this.inProgress = this.allTask.filter(task => task.status === TaskStatus.inProgress);
    this.completed = this.allTask.filter(task => task.status === TaskStatus.completed);
  }

}
