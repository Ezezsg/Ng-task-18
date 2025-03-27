import { Component, input } from '@angular/core';
import { Task } from '../../data-access/task.service';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  
})
export class TableComponent {

  tasks = input.required<Task[]>();

}
