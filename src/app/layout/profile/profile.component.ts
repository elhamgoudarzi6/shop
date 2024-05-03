import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [MatrialListModule, PrimengListModule],
})

export class ProfileComponent implements OnInit {
  mobile: any;
  fullName: any;
  image: any;
  items: MenuItem[] | undefined;
  screenWidth: number;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
    this.items = [
      {
        label: 'داشبرد',
        icon: 'pi pi-home',
        routerLink: '/profile',
        tooltip: 'داشبرد',
      },
      {
        label: 'کیف پول',
        icon: 'pi pi-wallet',
        tooltip: 'کیف پول',
        routerLink: '/profile/profile',
      },
      {
        label: 'سفارش ها',
        icon: 'pi pi-shopping-bag',
        tooltip: 'سفارش ها',
        routerLink: '/profile/order',
      },
      {
        label: 'پیغام',
        icon: 'pi pi-bell',
        tooltip: 'پیغام',
        routerLink: '/profile/profile',
      },
      {
        label: 'پروفایل',
        icon: 'pi pi-user',
        tooltip: 'پروفایل',
        routerLink: '/profile/account',
      },
      {
        label: 'خروج',
        icon: 'pi pi-sign-out',
        tooltip: 'خروج',
        command: () => this.logOut()
      },
    ];
  }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser('current') || this.localStorage.userType != 'user') {
    }
    this.image = this.localStorage.userImage;
    this.mobile = this.localStorage.userMobile;
    this.fullName = this.localStorage.userFullName;
  }


  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
    location.reload();
  }
}
