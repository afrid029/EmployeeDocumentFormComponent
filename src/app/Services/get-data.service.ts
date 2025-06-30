import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  data: any[] = [
    {
      Id : 1,
      contactcurrent: 'no',
      country: { name: 'Austria' },
      email: 'wqw12q@gmail.com',
      employmenttype: { type: 'Part-Time' },
      iscurrent: 'yes',
      name: 'Jale',
      phone: 5684845164,
      position: 'sdasdas',
      startdate: '01-03-2025',
      enddate: '01-05-2025',
      supervisor: 'sasdasdasd',
    },
    {
      Id : 2,
      contactcurrent: 'no',
      country: { name: 'Austria' },
      email: 'asse3q@gmail.com',
      employmenttype: { type: 'Part-Time' },
      iscurrent: 'yes',
      name: 'Kane',
      phone: 5684845164,
      position: 'sdasdas',
      startdate: '01-06-2021',
      enddate: '01-01-2023',
      supervisor: 'sasdasdasd',
    },
    {
      Id : 3,
      contactcurrent: 'no',
      country: { name: 'Austria' },
      email: 'r4weerq@gmail.com',
      employmenttype: { type: 'Part-Time' },
      iscurrent: 'no',
      name: 'Will',
      phone: 5684845164,
      position: 'sdasdas',
      startdate: '12-12-2012',
      enddate : '01-05-2017',
      supervisor: 'sasdasdasd',
    },
  ];

  constructor(private http: HttpClient) {}

  getCountry(): Observable<any> {
    return this.http.get('https://www.apicountries.com/countries');
  }

  getData() {
    return this.data;
  }
}
