import { Component, OnInit } from '@angular/core';
import { PrimengListModule } from '../../../primeng-list.module';
import { MessageService } from 'primeng/api';
import { LayoutService } from '../../layout.service';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  providers: [MessageService]

})
export class BannerComponent {
  images: any[] = [];
  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
  ) { }
  ngOnInit(): void {
    this.getBanner();
  }

  getBanner() {
    this.service.getBanner().subscribe((response: any) => {
      if (response.success === true) {
        this.images = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

}