import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {Task} from "../../interfaces/task";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @ViewChild('taskForm') taskform!: NgForm

 task: Task= {
   title: '',
   description: '',
   status: 'incomplete'
 }

  constructor(private toastr: ToastrService,
              private router: Router, private taskService: TaskService) {
  }

  onSubmit() {
      this.taskService.createTask(this.task).subscribe({
        next: () => {
          this.toastr.success('Task created successfully!', 'Success')
          this.taskform.resetForm()
          this.task = { title: '', description: '', status: 'incomplete'}
          this.router.navigate(['/tasks'])
        },
        error: () => {
          this.toastr.error('Error creating task!', 'Error')
        }
      })
    }

  onCancel() {
  this.taskform.resetForm()
  this.task = {title: '', description: '', status: 'incomplete' }
}

onGoBack() {
    this.router.navigate(['/tasks'])
  }

}
