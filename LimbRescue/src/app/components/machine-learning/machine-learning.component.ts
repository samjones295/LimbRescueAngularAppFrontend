import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';

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

  constructor(private groupService: GroupService) {}
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
    if(this.group_select != undefined){
      console.log(this.groups_data[this.group_select])
    }
    if(this.algo_select != undefined){
      console.log(this.algos[this.algo_select].viewValue)
    }
    
  }

}
