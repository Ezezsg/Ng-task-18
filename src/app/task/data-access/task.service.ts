import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

export interface Task {
  id: string;
  title: string;
  textarea: string;
  completed: boolean;
}

export type TaskCreate = Omit<Task, 'id'>

const PATH = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH)
  
  create(task: TaskCreate) {
    return addDoc(this._collection, task);
  }
}
