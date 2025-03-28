import { AfterViewInit, Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Task, TaskCreate, TaskService } from '../../data-access/task.service';
import { Router } from '@angular/router';
import { get } from '@angular/fire/database';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export default class TaskFormComponent{
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService); 
  private _router = inject(Router);

  loading = signal(false);

  idTask = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    textarea: this._formBuilder.control(''),
    completed: this._formBuilder.control(false, Validators.required),
  });

  constructor() {
    effect(()=> {
      const id = this.idTask();
      if(id){
        this.getTask(id);
      }
    })
  }

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

      const id = this.idTask(); //para editar

      if(id) {
        await this._taskService.update(task, id);
      } else {
        await this._taskService.create(task);
      }


      
      this._router.navigateByUrl("/tasks");
    } catch (error) {
        console.log(error);
    } finally {
      this.loading.set(false);
    }     
  }

  async getTask(id: string) {
    const taskSnapshot = await this._taskService.getTask(id);

    if(!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }

}
