import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{
  task: Task = {title: '', description: '', status: 'incomplete'}
  constructor(private router: Router, private taskService: TaskService,
              private toastr: ToastrService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const taskId = String(this.route.snapshot.paramMap.get('id'))
    this.taskService.getTaskById(taskId).subscribe(
      (task) =>{
        if(task) {
          this.task = task
        } else {
          this.toastr.error('Task not found!', 'Error')
          this.router.navigate(['/tasks'])
        }
      },
      (error) => {
        this.toastr.error('Error fetching task!', 'Error')
        this.router.navigate(['/tasks'])
      }
    )
  }
  onSubmit(taskForm: NgForm): void {
    if(taskForm.valid) {
      this.taskService.updateTask(this.task).subscribe({
        next: () => {
          this.toastr.success('Task updated successfully!', 'Success')
          this.router.navigate(['/tasks'])
        },
        error: () => {
          this.toastr.error('Error creating task!', 'Error')
        },
      })
    } else {
      this.toastr.error('Please correct the errors on the form.', 'Warning')
    }
  }

  onGoBack() {
    this.router.navigate(['/tasks'])
  }

}
