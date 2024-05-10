import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ConfirmDeleteDialogComponent} from "../../utils/confirm-delete-dialog/confirm-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  tasks: Task[]  = []

  constructor(private taskService: TaskService, private router: Router,
              private toastr: ToastrService, private dialog: MatDialog) {
  }




  ngOnInit(): void {
    this.displayTasks()
  }

  displayTasks() {
    this.taskService.getTaskList().subscribe((tasks) => {
      this.tasks = tasks
      if(tasks.length === 0){
        this.toastr.info('No tasks available.', 'Info')
      }
    },
      (error) => {
        this.toastr.error('Error while loading tasks. Please try again.', 'Error')
      }
      )
  }

  navigateToCreateTask() {
    this.router.navigate(['/task/create'])
  }

  confirmDelete(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent)

    dialogRef.afterClosed().subscribe((confirmed) => {
      if(confirmed){
        this.deleteTask(taskId)
      }
    })
  }
  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.toastr.success('Task deleted Successfully!', 'Success')
    },
      (error) => {
        this.toastr.error('Failed to delete task!', 'Error')
      }
    )
  }

  navigateToEditTask(taskId: string) {
    this.router.navigate([`/task/edit/${taskId}`])
  }
}
