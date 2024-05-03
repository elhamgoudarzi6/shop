import { DiscountAddComponent } from './discount-add/discount-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from '../admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
  standalone: true,
  imports: [PrimengListModule],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class DiscountComponent {

  discounts: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.getDiscount();
  }

  getDiscount(): any {
    this.service.getDiscount(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.discounts = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت نشد ',
        });
      }
    });
  }


  showAddDiscount(): void {
    const ref = this.dialogService.open(DiscountAddComponent, {
      header: 'ثبت تخفیف',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getDiscount();
      }
    });
  }

  deleteDiscount(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service
          .deleteDiscount(this.localStorage.userToken, id)
          .subscribe((response: any) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: 'حذف شد',
              });
              this.getDiscount()
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
