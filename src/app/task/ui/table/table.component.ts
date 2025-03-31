import { Component, effect, inject, input } from '@angular/core';
import { Task, TaskService } from '../../data-access/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.component.html',
})
export class TableComponent {
  private _taskService = inject(TaskService);

  tasks = input.required<Task[]>();

  constructor() {
  effect(() => {
       console.log(this.tasks());
     })
  }

  async delete(id: string){
    try {
      for(let task of this.tasks()){
        if(task.id == id){
          await this._taskService.delete(task, id);
        }
      }
    } catch (error) {
      console.log(error);
    }

  }
  
}
