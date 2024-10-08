import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task: Task;
  @Input() loading: any;
  constructor() { }

  ngOnInit(): void {
  }

}
