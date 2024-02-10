import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss',
})
export class ImportantTasksComponent {
newTask="";
InitialTaskList: any[] = [];
taskList: any[] = [];
httpService = inject(HttpService);
stateService = inject(StateService);
ngOnInit(){
  this.stateService.searchSubject.subscribe((value) => {
    console.log("search",value)
if (value) {
  this.taskList=this.InitialTaskList.filter((x) =>
  x.title.toLowerCase().includes(value.toLowerCase())
  );
}else{
this.taskList=this.InitialTaskList;
  }
  });
  this.getAllTasks();
}
addTask(){
  console.log("addTask",this.newTask)
  this.httpService.addTask(this.newTask).subscribe(() => {
    this.newTask="";
    this.getAllTasks();
  });
}
getAllTasks() {
  this.httpService.getAllTasks().subscribe((result: any) => {
    this.InitialTaskList = this.taskList = result;
  });
}
onComplete(task: any) {
task.completed=true;
console.log('complete', task);
this.httpService.updateTask(task).subscribe(() => {
this.getAllTasks();
});
}
onImportant(task: any){
  task.important=true;
  this.httpService.updateTask(task).subscribe(() => {
    this.getAllTasks();
  });
}
}

