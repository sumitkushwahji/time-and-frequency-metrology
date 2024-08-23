import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.domain + '/api/ntp';
@Injectable({
  providedIn: 'root',
})
export class NtpService {
  getByCountry(statType: string) {
    return this.httpClient.get<any[]>(baseUrl + statType + '/requestByCountry');
  }
  getByUserIP(statType: string) {
    return this.httpClient.get<any[]>(baseUrl + statType + '/requestByUserIP');
  }
  getByIp(statType: string) {
    return this.httpClient.get<any[]>(baseUrl + statType + '/requestByIP');
  }

  constructor(private httpClient: HttpClient) {}
}
