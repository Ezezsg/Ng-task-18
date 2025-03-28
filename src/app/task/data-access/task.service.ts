import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, addDoc, collectionData  } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, throwError, tap } from 'rxjs';

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
  loading = signal<boolean>(true);
  
  getTasks = toSignal(
    (
      collectionData(this._collection, {idField: 'id'}) as Observable<Task[]>
    ).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError(error =>{
        this.loading.set(false);
        return throwError(() => error);
      })
    ), 
      {
        initialValue: [],
      }
  );

  create(task: TaskCreate) {
    return addDoc(this._collection, task);
  }
}
