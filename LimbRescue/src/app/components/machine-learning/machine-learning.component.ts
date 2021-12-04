import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import { Result } from 'src/app/models/result.model';
import { formatDate } from '@angular/common';
import { ResultService } from 'src/app/services/result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.sass']
})
export class MachineLearningComponent implements OnInit {
  groups = [] as any
  groups_data = [] as any
  group_select: number | undefined
  algo_select: number | undefined

  show_spinner = false

  constructor(private router: Router, private groupService: GroupService, private resultService: ResultService) {}
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.groupService.getAll().subscribe(
      data => {
        this.groups_data = data
        for(let  i = 0; i<data.length; i++){
          this.groups[i] = { value: i, viewValue: data[i].name! }
        }
      },
      error => {
        console.log(error);
      }
    )

  }

  algos = [
    {value: 0, viewValue: "Support Vector Machine"},
    {value: 1, viewValue: "Random Forest"},
    {value: 2, viewValue: "Naive Bayes"},
    {value: 3, viewValue: "Multi Layer Perceptron"}
  ]

  runML(){
    if(this.group_select != undefined && this.algo_select != undefined){
      console.log(this.groups_data[this.group_select])
      console.log(this.algos[this.algo_select].viewValue)

      let date = formatDate(Date(),"YYYY-MM-dd",'en', 'GMT')

      let result = new Result()
      result.algorithm = this.algos[this.algo_select].viewValue
      result.date_ran = date
      result.group_name = this.groups_data[this.group_select].name
      result.id = 0
      result.test_accuracy = 0
      result.train_accuracy = 0

      this.show_spinner = true
      this.resultService.post(result).subscribe(response => {
        console.log(response)
        this.show_spinner = false
        this.router.navigate(['/results'])
      })
    }
    
  }

}
