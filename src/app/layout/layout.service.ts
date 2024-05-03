import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://api.goshi24.com/user/';

  sendSms(data: any): any {
    const headers = {
      'X-API-KEY': 'OEib74WVGhsSmthSz121cpOPdvMCnbfabHKdGRUh6ACQwY9II4kTBksqVIPlneEz',
      'Content-Type': 'application/json',
      'ACCEPT': 'text/plain'
    };
    return this.http.post('https://api.sms.ir/v1/send/verify', data, { 'headers': headers });
  }

  authUser(data: any): any {
    return this.http.post(this.baseUrl + 'authUser', data);
  }

  editUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editUser/' + id, data, { params });
  }
  getPaymentsByUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getPaymentsByUser/' + id, { params });
  }
  upload(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }

  onPayment(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'onPayment', data, { params });
  }

  verifyPayment(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'verifyPayment', data, { params });
  }
  getColor(): any {
    return this.http.get(this.baseUrl + 'getColor');
  }
  getFeature(): any {
    return this.http.get(this.baseUrl + 'getFeature');
  }
  getProduct(): any {
    return this.http.get(this.baseUrl + 'getProduct');
  }
  searchProduct(data: any): any {
    return this.http.post(this.baseUrl + 'searchProduct', data);
  }
  getCat(): any {
    return this.http.get(this.baseUrl + 'getCat');
  }
  getPrices(): any {
    return this.http.get(this.baseUrl + 'getPrices');
  }

  getFaqs(): any {
    return this.http.get(this.baseUrl + 'getFaqs');
  }
  getSlider(): any {
    return this.http.get(this.baseUrl + 'getSlider');
  }
  getBanner(): any {
    return this.http.get(this.baseUrl + 'getBanner');
  }
  getPlans(): any {
    return this.http.get(this.baseUrl + 'getPlans');
  }

  addContactMessage(data: any): any {
    return this.http.post(this.baseUrl + 'addContactMessage', data);
  }

  getOrdersByUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getOrdersByUser/' + id, { params });
  }

  addOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addOrder', data, { params });
  }

  editOrder(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editOrder/' + id, data, { params });
  }

}

