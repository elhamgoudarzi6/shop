import { Component, OnInit } from '@angular/core';
import { PrimengListModule } from '../../../primeng-list.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from '../admin.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { BannerAddComponent } from './banner-add/banner-add.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  imports: [PrimengListModule],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class BannerComponent implements OnInit {

  images: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.getBanner();
  }

  getBanner(): any {
    this.service.getBanner(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.images = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }


  showAddBannerDialog(): void {
    const ref = this.dialogService.open(BannerAddComponent, {
      header: 'ثبت بنر',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getBanner();
      }
    });
  }

  deleteBanner(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service
          .deleteBanner(this.localStorage.userToken, id)
          .subscribe((response: any) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: 'حذف شد',
              });
              this.getBanner()
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'حذف نشد',
              });
            }
          });
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }


}
