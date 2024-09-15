import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  todo: Task[] = [];
  inProgress: Task[] = [];
  completed: Task[] = [];
  loading: { [key: number]: boolean } = {};

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Simulating initial data load
    this.todo = [
      { id: 1, title: 'Create new product page', description: 'Design and implement a new product page layout', status: 'todo', deadline: '2024-07-15' },
      { id: 2, title: 'Update inventory system', description: 'Integrate real-time inventory tracking', status: 'todo', deadline: '2024-07-15' },
    ];
    this.inProgress = [
      { id: 3, title: 'Optimize checkout process', description: 'Streamline the checkout flow for better conversion', status: 'inProgress', deadline: '2024-07-15' },
    ];
    this.completed = [
      { id: 4, title: 'Launch email campaign', description: 'Send out newsletter to subscribers', status: 'completed', deadline: '2024-07-15' },
    ];
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      this.updateTaskStatus(task, event.container.id as 'todo' | 'inProgress' | 'completed');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  updateTaskStatus(task: Task, newStatus: 'todo' | 'inProgress' | 'completed') {
    this.loading[task.id] = true;
    // Simulating an API call
    setTimeout(() => {
      if (Math.random() > 0.8) {
        // Simulating a failure scenario
        this.loading[task.id] = false;
        this.snackBar.open('Failed to update task status. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-100', 'text-red-900']
        });
        // Revert the task to its original position
        this.revertTaskPosition(task);
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

  revertTaskPosition(task: Task) {
    const sourceList = this[task.status];
    const targetList = task.status === 'todo' ? this.inProgress : this.todo;
    const taskIndex = targetList.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      transferArrayItem(targetList, sourceList, taskIndex, sourceList.length);
    }
  }

  getColumnColor(status: string): string {
    switch (status) {
      case 'todo':
        return 'bg-gray-100';
      case 'inProgress':
        return 'bg-yellow-100';
      case 'completed':
        return 'bg-green-100';
      default:
        return 'bg-white';
    }
  }

}
