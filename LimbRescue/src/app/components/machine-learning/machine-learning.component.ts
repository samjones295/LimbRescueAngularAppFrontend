import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.sass']
})
export class MachineLearningComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {
  }

  groups =[
    {value: 1, viewValue: "Group 1"},
    {value: 2, viewValue: "Group 2"},
    {value: 3, viewValue: "Group 3"}
  ]
  algos = [
    {value: 1, viewValue: "Algo 1"},
    {value: 2, viewValue: "Algo 2"},
  ]
  dataManipulation = [
    {value: "D", viewValue: "Derived"},
    {value: "R", viewValue: "Raw"},
  ]

}
