import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  data : any[] = [
    {
      Id : 1,
      agree: "yes",
      dob: "08-02-1950",
      expiry: "03-06-2025",
      gender : {type: 'Female'},
      lastname : "asdasdasd",
      middlename: "dsasdasd",
      name: "ssdasd",
      nationality: {name: 'Austria'},
      passport: 2232332323
    },
     {
      Id: 2,
      agree: "yes",
      dob: "15-10-2026",
      expiry: "01-01-2016",
      gender : {type: 'Female'},
      name: "Kumari",
      nationality: {name: 'Canada'},
      passport: 8579641
    }
  ]

  constructor(private http : HttpClient) { }

  getCountry() : Observable<any> {
    return this.http.get("https://www.apicountries.com/countries");
  }

  getData()  {
    return this.data;
  }
}
