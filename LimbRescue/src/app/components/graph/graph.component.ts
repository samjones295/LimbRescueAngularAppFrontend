import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartPoint} from 'chart.js';
import { Observable } from 'rxjs';
import { Reading } from 'src/app/models/reading.model';
import { ReadingService } from 'src/app/services/reading.service';
import { ReadingDataService } from 'src/app/services/reading-data.service';

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
  // scatter
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
      borderColor: 'black',
      pointRadius: 3,
      pointBackgroundColor: 'red',
      showLine: true,
      fill: false
    },
  ];
  public scatterChartType: ChartType = 'scatter';

constructor(private readingService: ReadingService, private readingDataService: ReadingDataService) { }

ngOnInit() {
  this.getPatients().subscribe(data => {
    for(let  i = 0; i<data.length; i++){
      this.patients[i] = { value: i, viewValue: data[i].patient_no! }
      this.patients_data[i] = data[i].patient_no!
    }
  })
}


  patient_select!: number
  reading_select!: number
  laterality_select!: number

  toggleSelectReading(e: any){
    var readingSelect = document.getElementById("reading-select-field")
    if(readingSelect?.style.display == "inline-block"){
      readingSelect!.style.display = "none"
    }else{
      readingSelect!.style.display = "inline-block"
    }
    this.getReadingsOfPatient(this.patients[this.patient_select].viewValue).subscribe(data => {
      this.readings_data = data
      for(let i = 0; i<data.length;  i++){
        this.readings[i] = { value: i, viewValue: "ID: "+data[i].id +" Date Created: "+data[i].date_created + " Comments: " + data[i].comments}
      }
    }) 
  }

  toggleSelectLaterality(e: any){
    var lateralitySelect = document.getElementById("laterality-select-field")
    if(lateralitySelect?.style.display == "inline-block"){
      lateralitySelect!.style.display = "none"
    }else{
      lateralitySelect!.style.display = "inline-block"
    }
    this.getReadingsOfPatient(this.patients[this.patient_select].viewValue).subscribe(data => {
      for(let i = 0; i<data.length;  i++){
        this.lateralites[i] = { value: i, viewValue: data[i].laterality}
        this.lateralites_data[i] = data[i].laterality!
      }
    })

  }

  toggleButton(e: any){
    var runButton = document.getElementById("run-button")
    runButton!.style.display = "inline-block"
  }

  graphData(){
    let graph_data = [] as ChartPoint[]
    this.getReadingData(this.readings_data[this.reading_select].id, this.lateralites_data[this.laterality_select]).subscribe(data => {
      for(let i = 0; i<data.length; i++){
        graph_data[i] = {x: data[i].time, y: data[i].ppg_reading }
      }
      this.scatterChartData[0].data = graph_data
    })
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
    return this.readingDataService.getByReadingIdAndLaterality(reading_id, laterality+"_ARM")
  }

}
