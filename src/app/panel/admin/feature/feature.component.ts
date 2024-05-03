import { FeatureAddComponent } from './feature-add/feature-add.component';
import { ColorAddComponent } from './color-add/color-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from './../admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-feature',
  standalone: true,
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
  imports: [ReactiveFormsModule, PrimengListModule],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class FeatureComponent implements OnInit {
  features: any[] | any;
  colors: any[] | any;
  form: FormGroup | any;
  form2: FormGroup | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getFeature();
    this.getColor();
    this.createForm();
    this.createForm2();
  }

  createForm() {
    this.form = new FormGroup({
      feature: new FormControl(null),
    });
  }


  createForm2() {
    this.form2 = new FormGroup({
      code: new FormControl(null),
      name: new FormControl(null),
    });
  }

  getColor(): any {
    this.service.getColor(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.colors = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت نشد ',
        });
      }
    });
  }

  showAddColor(): void {
    const ref = this.dialogService.open(ColorAddComponent, {
      header: 'ثبت رنگ ',
      width: window.innerWidth > 840 ? '50%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getColor();
      }
    });
  }

  editColor(id: any) {
    this.service.editColor(this.localStorage.userToken, id, this.form2.value).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getColor();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت نشد ',
        });
      }
    });
  }

  deleteColor(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteColor(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف شد ',
            });
            this.getColor();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف نشد ',
            });
          }
        });
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }


  getFeature(): any {
    this.service.getFeature(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.features = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت نشد ',
        });
      }
    });
  }
  editFeature(id: any) {
    this.service.editFeature(this.localStorage.userToken, id, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getFeature();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت نشد ',
        });
      }
    });
  }

  showAddFeature(): void {
    const ref = this.dialogService.open(FeatureAddComponent, {
      header: 'ثبت ویژگی ',
      width: window.innerWidth > 840 ? '50%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getFeature();
      }
    });
  }

  deleteFeature(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteFeature(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف شد ',
            });
            this.getFeature();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف نشد ',
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

