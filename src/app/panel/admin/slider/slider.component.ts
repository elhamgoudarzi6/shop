import { SliderAddComponent } from './slider-add/slider-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from '../admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [PrimengListModule],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class SliderComponent implements OnInit {
  images: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.getSlider();
  }

  getSlider(): any {
    this.service.getSlider(this.localStorage.userToken).subscribe((response: any) => {
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


  showAddSliderDialog(): void {
    const ref = this.dialogService.open(SliderAddComponent, {
      header: 'ثبت اسلاید',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getSlider();
      }
    });
  }

  deleteSlider(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service
          .deleteSlider(this.localStorage.userToken, id)
          .subscribe((response: any) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: 'حذف شد',
              });
              this.getSlider()
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
