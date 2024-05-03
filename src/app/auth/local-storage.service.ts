import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public userJson: any;
  public userType: any;
  public userToken: any;
  public userID: any;
  public userImage: any;
  public userFullName: any;
  public userPhone: any;
  public userEmail: any;
  public userMobile: any;
  public userAddress: any;
  public userState: any;
  public userCity: any;
  constructor(private storageService: StorageService) { }

  saveCurrentUser(key: string, value: string) {
    localStorage.setItem(key, this.storageService.encrypt(value));
  }

  getCurrentUser(key: string) {
    let data = localStorage.getItem(key) || "";
    if (data !== undefined && data !== null && data !== "") {
      this.userJson = JSON.parse(this.storageService.decrypt(data));
      this.userType = this.userJson['type'];
      this.userToken = this.userJson['token'];
      this.userID = this.userJson['_id'];
      this.userImage = this.userJson['image'];
      this.userFullName = this.userJson['fullName'];
      this.userPhone = this.userJson['phone'];
      this.userEmail = this.userJson['email'];
      this.userMobile = this.userJson['mobile'];
      this.userState = this.userJson['state'];
      this.userCity = this.userJson['city'];
      this.userAddress = this.userJson['address'];
      return true;
    } else {
      return false;
    }
  }

  removeCurrentUser() {
    return localStorage.removeItem('current');
  }

}

