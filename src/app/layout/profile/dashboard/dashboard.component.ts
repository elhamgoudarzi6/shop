import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { MatrialListModule } from '../../../matrial-list.module';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [MatrialListModule, PrimengListModule],
})
export class DashboardComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,) { }

  ngOnInit(): void {
  }

}









