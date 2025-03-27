import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TaskCreate, TaskService } from '../../data-access/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService); 
  private _router = inject(Router);

  loading = signal(false);

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    textarea: this._formBuilder.control(''),
    completed: this._formBuilder.control(false, Validators.required),
  });

  async submit() {
    if(this.form.invalid) return;

    try {
      this.loading.set(true);
      const {title, textarea, completed} = this.form.value
      const task: TaskCreate = {
        title: title || '',
        textarea: textarea || '',
        completed: !!completed,
      };

      await this._taskService.create(task);
      this._router.navigateByUrl("/tasks");
    } catch (error) {
        console.log(error);
    } finally {
      this.loading.set(false);
    }
          
  }
}
