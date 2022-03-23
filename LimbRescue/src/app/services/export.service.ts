import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CsvData, CsvMetaData } from '../models/csv-data.model';
import { Constants } from 'src/app/global/Constants';

const baseUrl = Constants.IP;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  // get selected columns from a reading-data to export to a .csv file
  getDataForCSV(reading_id: number, laterality: string){
    return this.http.get<CsvData[]>(baseUrl+"/output?reading_id="+reading_id+"&laterality="+laterality)
  }

  getMetaDataForCSV(id: number, patient_no: string){
    return this.http.get<CsvMetaData[]>(baseUrl+"/reading_output?id="+id+"&patient_no="+patient_no)
  }


}
