import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../core/Task';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url:string;
  constructor(private http : HttpClient) { 
    this.url = 'http://localhost:3000/comments'
  }
  addTask(task : Task) : Observable<Task>{
    return this.http.post<Task>(this.url, task);
  }

  getTask() : Observable<Task[]>{
    return this.http.get<Task[]>(this.url);
  }

  editTask(task:Task) : Observable<Task>{
    return this.http.put<Task>(this.url+'/'+task.id,task);
  }
  
  deleteTask(task:Task) : Observable<Task>{
    return this.http.delete<Task>(this.url +'/'+task.id);
  }  


}
