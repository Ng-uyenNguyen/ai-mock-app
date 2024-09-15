import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  currentTasks: Task[] = [];
  loading = false;
  error: string | null = null;
  currentPage = 0;
  pageSize = 5;
  totalTasks = 0;
  filter = { status: 'all', priority: 'all', dueDate: 'all' };

  displayedColumns: string[] = ['title', 'description', 'deadline', 'priority', 'status'];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.error = null;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load tasks. Please try again.";
        this.loading = false;
      }
    });
  }

  applyFilter() {
    this.filteredTasks = this.tasks.filter(task => {
      return (this.filter.status === 'all' || task.status === this.filter.status) &&
        (this.filter.priority === 'all' || task.priority === this.filter.priority) &&
        (this.filter.dueDate === 'all' || (
          this.filter.dueDate === 'overdue' ? new Date(task.deadline || '') < new Date() :
            this.filter.dueDate === 'upcoming' ? new Date(task.deadline || '') >= new Date() :
              true
        ));
    });
    this.totalTasks = this.filteredTasks.length;
    this.updatePage();
  }

  updatePage() {
    const startIndex = this.currentPage * this.pageSize;
    this.currentTasks = this.filteredTasks.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  onFilterChange() {
    this.currentPage = 0;
    this.applyFilter();
  }
}