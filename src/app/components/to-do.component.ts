import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../core/crud.service';
import { Task } from '../core/Task';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  todoForm!: FormGroup;
  list: Task = new Task();
  taskArr: Task[] = [];
  testObj: any;
  isEditenabled: boolean = false;
  addnewTask: string = '';
  editTasks: string = '';

  constructor(private service: CrudService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
    });
    this.getallTask();
  }

  getallTask() {
    this.service.getTask().subscribe(
      (e) => {
        this.taskArr = e;
        console.log(e);
        console.log('this.taskArr', this.taskArr);
      },
      (err) => {
        alert('Unable To Get Task List');
      }
    );
  }

  addTask() {
    this.list.task = this.addnewTask;
    this.service.addTask(this.todoForm.value).subscribe((e) => {
      console.log(e);
    });

    this.getallTask();
    this.todoForm.reset();
  }

  updateTask() {
    this.list.task = this.todoForm.controls['task'].value;
    console.log(this.testObj);
    this.testObj.task = this.todoForm.controls['task'].value;
    this.service.editTask(this.testObj).subscribe(
      (e) => {
        console.log(e);
      },
      (err) => {
        alert('Failed To Update Task.');
      }
    );
    this.todoForm.reset();
    this.isEditenabled = false;
  }

  editTask(etask: Task) {
    this.todoForm.controls['task'].setValue(etask.task);
    this.testObj = new Task();
    this.testObj.id = etask.id;
    this.testObj.task = etask.task;
    this.list = etask;
    this.editTasks = etask.task;
    this.isEditenabled = true;
  }

  deleteTask(etask: Task) {
    this.service.deleteTask(etask).subscribe((e) => {
      console.log(e);
    });
    this.getallTask();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
