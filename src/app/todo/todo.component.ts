import { Component, OnInit } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { Task } from '../task';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  tasks: Task[] = [];
  archivedTasks: Task[] = [];
  isHisotryTaskShown = false;


  constructor(private todoService: TodoService) { }

  getSize(): number {
    return this.tasks.length;
  }

  getTasks(): void {
    this.todoService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }


  addRow(): void {
    const newTask: Task = {
          id: null,
          topic: '',
          text: '',
          date: new Date(),
          priority: false,
          execution: false
        };
    this.todoService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
      });
  }

  addTask(task: Task): void {
    const newTask: Task = {
          id: task.id,
          topic: task.topic,
          text: task.text,
          date: task.date,
          priority: task.priority,
          execution: task.execution
        };
    this.todoService.updateTask(newTask)
      .subscribe();
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.todoService.deleteTask(task).subscribe();
  }

  // --------------------------------------------------------

  sortByUnfinished(): void {
    const sortedTasks = this.tasks.sort((e1, e2) => {
      if (e1.execution > e2.execution) {
        return 1;
      }
      if (e1.execution < e2.execution) {
        return -1;
      }
    });
    this.tasks = sortedTasks;
  }

  sortByNo(): void {
    const sortedTasks = this.tasks.sort((e1, e2) => {
      if (e1.id > e2.id) {
        return 1;
      }
      if (e1.id < e2.id) {
        return -1;
      }
    });
    this.tasks = sortedTasks;
  }

  sortByOldest(): void {
    const sortedTasks = this.tasks.sort((e1, e2) => {
      if (e1.date > e2.date) {
        return 1;
      }
      if (e1.date < e2.date) {
        return -1;
      }
    });
    this.tasks = sortedTasks;
  }

  sortByNewest(): void {
    const sortedTasks = this.tasks.sort((e1, e2) => {
      if (e1.date > e2.date) {
        return -1;
      }
      if (e1.date < e2.date) {
        return 1;
      }
    });
    this.tasks = sortedTasks;
  }

  sortByPriority(): void {
    const sortedTasks = this.tasks.sort((e1, e2) => {
      if (e1.priority > e2.priority) {
        return -1;
      }
      if (e1.priority < e2.priority) {
        return 1;
      }
    });
    this.tasks = sortedTasks;
  }

  // getMaxId(): number {
  //   if (!this.tasks.length) {
  //     return 0;
  //   }
  //   const ids = this.tasks.map(task => task.id);
  //   const maxId = Math.max(...ids);
  //   return maxId;
  // }

  // incrementId(): number {
  //   const id = this.getMaxId() + 1;
  //   return id;
  // }

  // addTask(): void {
  //   const newTask: Task = {
  //     id: 0,
  //     topic: '',
  //     text: '',
  //     date: new Date(),
  //     priority: false,
  //     execution: false
  //   };
  //   this.tasks.push(newTask);
  // }

  setPriority(task: Task): boolean {
    if (task.priority === false) {
      task.priority = true;

      return true;
    } else {
      task.priority = false;
      return false;
    }
  }

  setExecution(task: Task): boolean {
    if (task.execution === false) {
      task.execution = true;
      console.log(task.execution);
      return true;
    } else {
      task.execution = false;
      return false;
    }
  }

  changeColor(isTrue: boolean): boolean {
    return isTrue;
  }


  // deleteTask(taskToDelete: Task): void {
  //   if (confirm('Are you sure you want to delete this task?')) {
  //     this.deleteTask();
      // const idToDelete = taskToDelete.id;
      // const newTasks = this.tasks.filter((element) => {
      //   return idToDelete !== element.id;
      // });
      // this.tasks = newTasks;
  //   }
  // }

  clearfinishedTasks(): void {
    if (confirm('Are you sure you want to clear finished tasks?')) {
      const newTasks = this.tasks.filter((element) => {
        return element.execution === false;
      });
      this.tasks = newTasks;
    }
  }

  archiveTasks(): void {
    if (confirm('Are you sure you want to archive finished tasks?')) {
      const newTasks = this.tasks.filter((element) => {
        return element.execution === true;
      });
      for (let i = 0; i < newTasks.length; i++) {
        this.archivedTasks.push(newTasks[i]);
      }
      this.clearfinishedTasks();
    }
  }

  showHistory(): void {
    if (!this.isHisotryTaskShown) {
      this.isHisotryTaskShown = true;
    } else {
      this.isHisotryTaskShown = false;
    }
  }


  ngOnInit(): void {
    this.getTasks();
  }

}
