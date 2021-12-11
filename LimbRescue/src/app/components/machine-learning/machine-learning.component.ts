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
  // Array used for algorithm selection
  algos = [
    {value: 0, viewValue: "Support Vector Machine"},
    {value: 1, viewValue: "Random Forest"},
    {value: 2, viewValue: "Naive Bayes"},
    {value: 3, viewValue: "Multi Layer Perceptron"}
  ]

  // Define variables to hold groups, group data, and selections
  groups = [] as any
  groups_data = [] as any
  group_select: number | undefined
  algo_select: number | undefined

  // Variable to see if the spinner should be displayed
  show_spinner = false

  // Subscriptions for groups and the result from the post method
  groups_sub: any;
  result_post_sub: any;

  constructor(private router: Router, private groupService: GroupService, private resultService: ResultService) {}
  
  // Called when page is loaded, dont need to do anything
  ngOnInit(){}

  // Called after page has loaded
  ngAfterViewInit() {
    // Get all of the groups
    this.groups_sub = this.groupService.getAll().subscribe(data => {
      // Set the group data to the groups
      this.groups_data = data

      // Loop throughthe groups and set the selection
      for(let  i = 0; i<data.length; i++){
        this.groups[i] = { value: i, viewValue: data[i].name! }
      }
    })
  }

  // Called when the page is left
  ngOnDestroy(){
    // Unsubscribe from subscriptions to prevent resource leaks
    if(this.groups_sub != undefined){
      this.groups_sub.unsubscribe()
    }
    if(this.result_post_sub != undefined){
      this.result_post_sub.unsubscribe()
    }
  }

  // Called when the run machine learning button  is pressed
  runML(){
    // If the selections were made
    if(this.group_select != undefined && this.algo_select != undefined){
      // Create a new date with the correct format
      let date = formatDate(Date(),"YYYY-MM-dd",'en', 'GMT')

      // Create a result object to pass to the ml backend  function
      let result = new Result()

      // Set all of the result fields to pass
      result.algorithm = this.algos[this.algo_select].viewValue
      result.date_ran = date
      result.group_name = this.groups_data[this.group_select].name
      result.id = 0
      result.test_accuracy = 0
      result.train_accuracy = 0

      // Start the spinner
      this.show_spinner = true
      
      // Do the post to run the ML algorithm
      this.result_post_sub = this.resultService.post(result).subscribe(response => {
        // After finished, turn the spinneroff
        this.show_spinner = false

        // Go to the results page to show the results
        this.router.navigate(['/results'])
      })
    }
  }

}
