// this class mimics data returned from the Reading Data table
export class CsvData {
    ppg_reading?: number;
    time?: number;
    laterality?: string
}
// this class mimics data returned from the Reading table
export class CsvMetaData{
    comments?: string;
    date_created?: string;
    patient_no?: String;
    id?: number;
    laterality?: string;
}
