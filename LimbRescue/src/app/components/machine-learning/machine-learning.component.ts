import { Component, OnInit  } from '@angular/core';
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
  algos = [
    {value: 0, viewValue: "Support Vector Machine"},
    {value: 1, viewValue: "Random Forest"},
    {value: 2, viewValue: "Naive Bayes"},
    {value: 3, viewValue: "Multi Layer Perceptron"}
  ]

  groups = [] as any
  groups_data = [] as any
  group_select: number | undefined
  algo_select: number | undefined

  show_spinner = false

  groups_sub: any;
  result_post_sub: any;

  constructor(private router: Router, private groupService: GroupService, private resultService: ResultService) {}
  
  ngOnInit(){}

  ngAfterViewInit() {
    this.groups_sub = this.groupService.getAll().subscribe(
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

  ngOnDestroy(){
    if(this.groups_sub != undefined){
      this.groups_sub.unsubscribe()
    }
    if(this.result_post_sub != undefined){
      this.result_post_sub.unsubscribe()
    }
  }

  runML(){
    if(this.group_select != undefined && this.algo_select != undefined){
      let date = formatDate(Date(),"YYYY-MM-dd",'en', 'GMT')
      let result = new Result()

      result.algorithm = this.algos[this.algo_select].viewValue
      result.date_ran = date
      result.group_name = this.groups_data[this.group_select].name
      result.id = 0
      result.test_accuracy = 0
      result.train_accuracy = 0

      this.show_spinner = true
      this.result_post_sub = this.resultService.post(result).subscribe(response => {
        this.show_spinner = false
        this.router.navigate(['/results'])
      })
    }
  }

}
