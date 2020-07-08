import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/Todo';
const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string= 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=0';

  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]> {
    // return [
    //   {
    //     id:1,
    //     title: 'Todo One',
    //     completed: false
    //   },
    //   {
    //     id:2,
    //     title: 'Todo Two',
    //     completed: true
    //   },
    //   {
    //     id:3,
    //     title: 'Todo Three',
    //     completed: false
    //   },
    // ]
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  deleteTodo(todo:Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions)
  }
}
