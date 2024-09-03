import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http:HttpClient) { }

  uploadFile(file:any,options?:any){
    const url = 'http://localhost:8099/api/sendfile/uploadExcelFile';
    return this.http.post<any>(url,file);
  }
}
