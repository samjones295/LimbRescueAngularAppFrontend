import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint} from 'chart.js';
import { Observable } from 'rxjs';
import { Reading } from 'src/app/models/reading.model';
import { ReadingService } from 'src/app/services/reading.service';
import { ReadingDataService } from 'src/app/services/reading-data.service';
import { ActivatedRoute } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { CsvData } from 'src/app/models/csv-data.model';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  // Define variables to hold data in the format for the select elements
  readings = [] as any
  patients = [] as any
  lateralites = [] as any

  // Define a variable to hold the actual data received
  readings_data = [] as Reading[]
  patients_data = [] as string[]
  lateralites_data = [] as string[]

  // Define variables to hold the index of the selection from the dropdown
  patient_select!: number | undefined
  reading_select!: number | undefined
  laterality_select!: number | undefined

  // Define variables for subscriptions
  query_params_sub: any;
  reading_data_sub: any;
  reading_data_sub_bilateral: any;
  patients_sub: any;
  readings_of_patient_sub: any;

  // Define variables to hold info given from clicking the graph button on the home page
  routed_id: number | undefined
  routed_laterality: string | undefined

  // All of the options for a the chart on the graph page.
  // Please check chart.js documentation for more information
  public scatterChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales:  {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontSize: 25
        },
        ticks: {
          fontSize: 20
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Reading Value',
          fontSize: 25
        },
        ticks: {
          fontSize: 20
        }
      }]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          enabled: true,
          mode: 'xy'
        }
      }
    }
  };

  // Options for the data for the chart
  // Please check chart.js documentation for more information
  public scatterChartData: ChartDataSets[] = [
    {
      data: [],
      borderColor: 'red',
      pointRadius: 3,
      pointBackgroundColor: 'black',
      showLine: true,
      fill: false
    },
    {
      data: [],
      borderColor: 'blue',
      pointRadius: 3,
      pointBackgroundColor: 'black',
      showLine: true,
      fill: false
    },
  ];

  // Chart type to display on graph 
  // Please check chart.js documentation for more information
  public scatterChartType: ChartType = 'scatter';

  // Route is to get parameters from coming from a different page
  // The two services are used to get http requests from the backend
  constructor(private route: ActivatedRoute, private readingService: ReadingService, private readingDataService: ReadingDataService, private csvDataService: ExportService) { }

  // This function is called when the page is loaded 
  ngOnInit() {
    // Use this subscription to get the query parameters from the route if there are any
    this.query_params_sub = this.route.queryParams.subscribe(params => {
      this.routed_id = params.reading_id
      this.routed_laterality = params.laterality
    });

    // If the routed  query params  arent undefined
    if(this.routed_id != undefined && this.routed_laterality != undefined){

      // Initialize some necesary graph variables
      let graph_data = [] as ChartPoint[]
      let graph_data_bilateral = [] as ChartPoint[]

      // If the laterality given from the query parameters isn't BILATERAL
      if(this.routed_laterality != "BILATERAL"){

        // Get the reading data from a single arm using the routed parameters
        this.reading_data_sub = this.getReadingData(this.routed_id, this.routed_laterality).subscribe(data => {

          // Go through all the data and create graph data points 
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
          }

          // Set the chart data to the data from the accumulated points
          this.scatterChartData[0].data = graph_data
        })
      }

      // If the laterality is given from the query parameters as BILATERAL
      else{

        // First get the reading data from the LEFT_ARM
        this.reading_data_sub = this.getReadingData(this.routed_id, "LEFT_ARM").subscribe(data => {

          // Go through all the data and create graph data points
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
          }

          // Set the chart data to the data from the accumulated points
          this.scatterChartData[0].data = graph_data
        })

        // Next get the reading data from the RIGHT_ARM
        this.reading_data_sub_bilateral = this.getReadingData(this.routed_id, "RIGHT_ARM").subscribe(data => {
          
          // Go through all the data and create graph data points
          for(let i = 0; i<data.length; i++){
            graph_data_bilateral[i] = {x: data[i].time, y: data[i].ppg_reading }
          }

          // Set the chart data to the data from the accumulated points
          this.scatterChartData[1].data = graph_data_bilateral
        })
      }
    }

    // Regardless of routed parameters, get the paitents to put into the patients selection menu
    this.patients_sub = this.getPatients().subscribe(data => {

      // Make the data be a set so there are no repeats in the selection menu
      let patients_set = new Set()

      // Go through the data and add it all tot he set
      for(let  i = 0; i<data.length; i++){
        patients_set.add(data[i].patient_no)
      }

      // Initialize a counter variable andt  hen loop through the patients and add them to the selection  menu
      let cnt = 0
      for(let patient of patients_set){
        this.patients[cnt] = { value: cnt, viewValue: patient}
        this.patients_data[cnt] = String(patient)
        cnt++
      }
    })
  }

  // This method is called when navigating away from the Graph page
  // All this method does is unsubscribe from each subscription to prevent memmory leaks
  ngOnDestroy(){
    if(this.query_params_sub != undefined){
      this.query_params_sub.unsubscribe()
    }
    if(this.reading_data_sub != undefined){
      this.reading_data_sub.unsubscribe()
    }
    if(this.patients_sub != undefined){
      this.patients_sub.unsubscribe()
    }
    if(this.readings_of_patient_sub != undefined){
      this.readings_of_patient_sub.unsubscribe()
    }
    if(this.reading_data_sub_bilateral != undefined){
      this.reading_data_sub_bilateral.unsubscribe()
    }
  }

  // This method is called after making a selection on the patient select dropdown
  toggleSelectReading(e: any){

    // Reinitialize the selections, the selection menus and the actual data
    // each time a new patient is selected

    this.reading_select = undefined
    this.laterality_select = undefined

    this.readings = []
    this.lateralites = []
  
    this.readings_data = []
    this.lateralites_data = [] 

    // Get the reading select element from the web page
    var readingSelect = document.getElementById("reading-select-field")

    // If the display is not showing, make sure to show it
    if(readingSelect?.style.display != "inline-block"){
      readingSelect!.style.display = "inline-block"
    }

    // If a selection is made for a patient
    if(this.patient_select != undefined){

      // Get the data from the selected patient
      this.readings_of_patient_sub = this.getReadingsOfPatient(this.patients[this.patient_select].viewValue).subscribe(data => {
        
        // Set the data to the received from the http method
        this.readings_data = data

        // Loop through the data and put it into the reading selection menu in reverse order so the most recent reading it at the top
        for(let i = 0; i<data.length;  i++){
          this.readings[(data.length - 1) - i] = { value: i, viewValue: "ID: "+data[i].id +" Date Created: "+data[i].date_created + " Comments: " + data[i].comments}
        }
      })
    } 
  }

  // This method is called after selecting a reading from the reading selections
  toggleSelectLaterality(e: any){

    // Reinitialize the selections, the selection menus and the actual data
    // each time a new reading is selected
    this.laterality_select = undefined

    this.lateralites = []
  
    this.lateralites_data = []

    // Get the reading select element from the web page
    var lateralitySelect = document.getElementById("laterality-select-field")

    // If the display is not showing, make sure to show it
    if(lateralitySelect?.style.display != "inline-block"){
      lateralitySelect!.style.display = "inline-block"
    }

    // If a reading is selected
    if(this.reading_select != undefined){

      // Set the routed id to the id of the selected reading
      this.routed_id = this.readings_data[this.reading_select].id

      // If a patient is selected
      if(this.patient_select != undefined){

        // Get the reading data to use for laterality selction
        this.readings_of_patient_sub = this.getReadingsOfPatient(this.patients[this.patient_select].viewValue).subscribe(data => {

          // Get the laterality from a reading 
          let laterality = this.readings_data[this.reading_select!].laterality

          // Check if the laterality is bilateral
          if(laterality == "BILATERAL"){
            // If it is, set the lateralities selection menu to all 3
            this.lateralites[0] = { value: 0, viewValue: "LEFT_ARM"}
            this.lateralites[1] = { value: 1, viewValue: "RIGHT_ARM"}
            this.lateralites[2] = { value: 2, viewValue: "BILATERAL"}

            // Set the actual data as well
            this.lateralites_data[0] = "LEFT_ARM"
            this.lateralites_data[1] = "RIGHT_ARM"
            this.lateralites_data[2] = "BILATERAL"
          }
          // Laterality not bilateral
          else{
            // Just set the data to the selected laterality
            this.lateralites[0] = { value: 0, viewValue: laterality}
            this.lateralites_data[0] = laterality!
          }
        })
      }
    }
  }

  // Called after all three selections are made
  toggleButton(e: any){
    // Show the run button
    var runButton = document.getElementById("run-button")
    var csvButton = document.getElementById("csv-button")
    runButton!.style.display = "inline-block"
    csvButton!.style.display = "inline-block"
    /* sp22; 
      We follow the existng logic, we make the csv button available after all three selections are made.
      We need this method to make the selection values persist after graphData() is called because it wipes all the selections before returning.
      Future reccomendations are refactor code to allow selection values to persist through graphing
    */
    if (this.reading_select != undefined && this.patient_select != undefined && this.laterality_select != undefined){
      this.setcsvData(this.readings_data[this.reading_select].id, this.patients[this.patient_select].viewValue, this.readings_data[this.reading_select].id, this.lateralites_data[this.laterality_select])
    }
    
  }

  // Called when the graph button is called
  graphData(){
    // clear the existing scatter chart data if there is any (to account for going from a biltateral to unilateral reading)
    this.scatterChartData[0].data = []
    this.scatterChartData[1].data = []
    // Initialize variables for the graph
    let graph_data = [] as ChartPoint[]
    let graph_data_bilateral = [] as ChartPoint[]

    // If selections are made for reading and laterality
    if(this.reading_select != undefined && this.laterality_select != undefined){
      console.log("READING SELECT: ")
      console.log(this.readings_data[this.reading_select])

      // If the selected laterality is not BILATERAL
      if(this.lateralites_data[this.laterality_select] != "BILATERAL"){

        // Get the reading data from the selected reading with the seelected laterality
        this.reading_data_sub = this.getReadingData(this.readings_data[this.reading_select].id, this.lateralites_data[this.laterality_select]).subscribe(data => {
         
          // Create graph points for all the data
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }

          }
          // Set all the graph data to the accumulated points
          this.scatterChartData[0].data = graph_data
        })
      }
      // If the laterality is bilateral
      else{
        // First get the reading data from the left arm
        this.reading_data_sub = this.getReadingData(this.readings_data[this.reading_select].id, "LEFT_ARM").subscribe(data => {
          
          // Accumulate all the data for the left arm
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          // Set all the graph data to the accumulated points
          this.scatterChartData[0].data = graph_data
        })
        // Next get the reading data from the right arm
        this.reading_data_sub_bilateral = this.getReadingData(this.readings_data[this.reading_select].id, "RIGHT_ARM").subscribe(data => {
          // Accumulate all the data for the right arm
          for(let i = 0; i<data.length; i++){
            graph_data_bilateral[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          // Set all the graph data to the accumulated points
          this.scatterChartData[1].data = graph_data_bilateral
        })
      }

      // Change all of the select elements back to empty and reinitialize everything back to empty
      // to get ready for a new selection
      var readingSelect = document.getElementById("reading-select-field")
      readingSelect!.style.display = "none"

      var lateralitySelect = document.getElementById("laterality-select-field")
      lateralitySelect!.style.display = "none"

      this.patient_select = undefined
      this.reading_select = undefined
      this.laterality_select = undefined

      this.readings = []
      this.lateralites = []
    
      this.readings_data = []
      this.lateralites_data = [] 
    }
  }

  // class variables needed for selection values to persist
  csv_reading_id: number = 0
  csv_patiend_no: string = ""
  csv_reading_data_id: number = 0
  csv_laterality: string = ""
  // method that stores selection values
  setcsvData(reading_id: number, patient_no: string, reading_data_id: number, laterality: string) {
    // id for records in reading_data table
    this.csv_reading_id = reading_id
    this.csv_patiend_no = patient_no
    // id for records in reading table
    this.csv_reading_data_id = reading_data_id
    this.csv_laterality = laterality
  }

  csvDownload(){
    // setting options for the CVS file, see https://www.npmjs.com/package/ngx-csv for detials
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: "default_title",
      useBom: true,
      noDownload: false,
      headers: ["ppg", "time", "laterality"]
    };
    
    // name of the csv file when downloaded
    var filename = this.csv_laterality + "_reading_" + this.csv_reading_id.toString()

    // get the meta data for the reading, specifically the time stamp of the reading
    if (this.reading_select != undefined && this.patient_select != undefined){
      this.getCsvMetaData(this.csv_reading_id, this.csv_patiend_no).subscribe(data => {
        options.title = data[0].date_created!
        // append the date to the title
        filename = filename  + "_on" + data[0].date_created!
      })
    }

    // all the json data that will be put into the csv files
    var fileData = [] as CsvData[]

    if (this.csv_laterality == "BILATERAL") {
      // get both arms if its a bilateral reading
      this.getCsvData(this.csv_reading_data_id, "LEFT_ARM").subscribe(data => {
        fileData = data
        this.getCsvData(this.csv_reading_data_id, "RIGHT_ARM").subscribe(data => {
          fileData = fileData.concat(data)
          new ngxCsv(fileData, filename, options);
        })
      })
      
    } else {
      // reading isnt bilateral, only need to get one arm reading
      this.getCsvData(this.csv_reading_data_id, this.csv_laterality).subscribe(data => {
        fileData = data
        new ngxCsv(fileData, filename, options);
      })
    }
  }

  //  The following methods just  call the services to call the http methods to get data
  getPatients(): Observable<Reading[]>{
    return this.readingService.getAll()
  }

  getReadings(patient: string):  Observable<Reading[]>{
    return this.readingService.getByString(patient)
  }

  getReadingsOfPatient(patient:  string): Observable<Reading[]>{
    return this.readingService.getAllOfPatient(patient)
  }

  getReadingData(reading_id: number, laterality: string){
    return this.readingDataService.getByReadingIdAndLaterality(reading_id, laterality)
  }

  getCsvData(reading_id: number, laterality: string){
    return this.csvDataService.getDataForCSV(reading_id, laterality)
  }

  getCsvMetaData(id: number, patient_no: string){
    return this.csvDataService.getMetaDataForCSV(id, patient_no)
  }

}
