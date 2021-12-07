import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint} from 'chart.js';
import { Observable } from 'rxjs';
import { Reading } from 'src/app/models/reading.model';
import { ReadingService } from 'src/app/services/reading.service';
import { ReadingDataService } from 'src/app/services/reading-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  readings = [] as any
  patients = [] as any
  lateralites = [] as any

  readings_data = [] as Reading[]
  patients_data = [] as string[]
  lateralites_data = [] as string[]

  patient_select!: number | undefined
  reading_select!: number | undefined
  laterality_select!: number | undefined

  query_params_sub: any;
  reading_data_sub: any;
  reading_data_sub_bilateral: any;
  patients_sub: any;
  readings_of_patient_sub: any;

  routed_id: number | undefined
  routed_laterality: string | undefined

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
  public scatterChartType: ChartType = 'scatter';

  constructor(private route: ActivatedRoute, private readingService: ReadingService, private readingDataService: ReadingDataService) { }

  ngOnInit() {
    this.query_params_sub = this.route.queryParams.subscribe(params => {
      this.routed_id = params.reading_id
      this.routed_laterality = params.laterality
    });
    if(this.routed_id != undefined && this.routed_laterality != undefined){
      let graph_data = [] as ChartPoint[]
      let graph_data_bilateral = [] as ChartPoint[]
      if(this.routed_laterality != "BILATERAL"){
        this.reading_data_sub = this.getReadingData(this.routed_id, this.routed_laterality).subscribe(data => {
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          this.scatterChartData[0].data = graph_data
        })
      }
      else{
        this.reading_data_sub = this.getReadingData(this.routed_id, "LEFT_ARM").subscribe(data => {
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          this.scatterChartData[0].data = graph_data
        })
        this.reading_data_sub_bilateral = this.getReadingData(this.routed_id, "RIGHT_ARM").subscribe(data => {
          for(let i = 0; i<data.length; i++){
            graph_data_bilateral[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          this.scatterChartData[1].data = graph_data_bilateral
        })
      }
    }
    this.patients_sub = this.getPatients().subscribe(data => {
      let patients_set = new Set()
      for(let  i = 0; i<data.length; i++){
        patients_set.add(data[i].patient_no)
      }
      let cnt = 0
      for(let patient of patients_set){
        this.patients[cnt] = { value: cnt, viewValue: patient}
        this.patients_data[cnt] = String(patient)
        cnt++
      }
    })
  }

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

  toggleSelectReading(e: any){
    this.reading_select = undefined
    this.laterality_select = undefined

    this.readings = []
    this.lateralites = []
  
    this.readings_data = []
    this.lateralites_data = [] 

    var readingSelect = document.getElementById("reading-select-field")
    if(readingSelect?.style.display != "inline-block"){
      readingSelect!.style.display = "inline-block"
    }
    if(this.patient_select != undefined){
      this.readings_of_patient_sub = this.getReadingsOfPatient(this.patients[this.patient_select].viewValue).subscribe(data => {
        this.readings_data = data
        for(let i = 0; i<data.length;  i++){
          this.readings[i] = { value: i, viewValue: "ID: "+data[i].id +" Date Created: "+data[i].date_created + " Comments: " + data[i].comments}
        }
      })
    } 
  }

  toggleSelectLaterality(e: any){
    this.laterality_select = undefined

    this.lateralites = []
  
    this.lateralites_data = []

    var lateralitySelect = document.getElementById("laterality-select-field")
    if(lateralitySelect?.style.display != "inline-block"){
      lateralitySelect!.style.display = "inline-block"
    }
    if(this.reading_select != undefined){
      this.routed_id = this.readings_data[this.reading_select].id
      if(this.patient_select != undefined){
        this.readings_of_patient_sub = this.getReadingsOfPatient(this.patients[this.patient_select].viewValue).subscribe(data => {
          let laterality = this.readings_data[this.reading_select!].laterality
          if(laterality == "BILATERAL"){
            this.lateralites[0] = { value: 0, viewValue: "LEFT_ARM"}
            this.lateralites[1] = { value: 1, viewValue: "RIGHT_ARM"}
            this.lateralites[2] = { value: 2, viewValue: "BILATERAL"}

            this.lateralites_data[0] = "LEFT_ARM"
            this.lateralites_data[1] = "RIGHT_ARM"
            this.lateralites_data[2] = "BILATERAL"
          }
          else{
            this.lateralites[0] = { value: 0, viewValue: laterality}
            this.lateralites_data[0] = laterality!
          }
        })
      }
    }
  }

  toggleButton(e: any){
    var runButton = document.getElementById("run-button")
    runButton!.style.display = "inline-block"
  }

  graphData(){
    let graph_data = [] as ChartPoint[]
    let graph_data_bilateral = [] as ChartPoint[]
    if(this.reading_select != undefined && this.laterality_select != undefined){
      if(this.lateralites_data[this.laterality_select] != "BILATERAL"){
        this.reading_data_sub = this.getReadingData(this.readings_data[this.reading_select].id, this.lateralites_data[this.laterality_select]).subscribe(data => {
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          this.scatterChartData[0].data = graph_data
        })
      }
      else{
        this.reading_data_sub = this.getReadingData(this.readings_data[this.reading_select].id, "LEFT_ARM").subscribe(data => {
          for(let i = 0; i<data.length; i++){
            graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          this.scatterChartData[0].data = graph_data
        })
        this.reading_data_sub_bilateral = this.getReadingData(this.readings_data[this.reading_select].id, "RIGHT_ARM").subscribe(data => {
          for(let i = 0; i<data.length; i++){
            graph_data_bilateral[i] = {x: data[i].time, y: data[i].ppg_reading }
          }
          this.scatterChartData[1].data = graph_data_bilateral
        })
      }

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

}
