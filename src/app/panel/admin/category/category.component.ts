import { AdminService } from './../admin.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { SubcategoryAddComponent } from './subcategory-add/subcategory-add.component';
import { SubcategoryEditComponent } from './subcategory-edit/subcategory-edit.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: true,
  imports: [PrimengListModule],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class CategoryComponent implements OnInit {
  categories: any[] | any;
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private dialogService: DialogService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): any {
    this.service.getCat(this.localStorage.userToken,).subscribe((response: any) => {
      if (response.success === true) {
        this.categories = response.data;
        console.log(this.categories);
      } else {
        this.messageService.add({ severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data });
      }
    });
  }

  showEditCat(cat: any): void {
    const ref = this.dialogService.open(CategoryEditComponent, {
      data: { cat },
      header: 'ویرایش سطح اول',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getCategory();
      }
    });
  }

  showAddCat(): void {
    const ref = this.dialogService.open(CategoryAddComponent, {
      header: 'ثبت سطح اول',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getCategory();
      }
    });
  }

  showAddSubCat(id: any): void {
    const ref = this.dialogService.open(SubcategoryAddComponent, {
      data: { id },
      header: 'ثبت سطح دوم',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getCategory();
      }
    });
  }

  showEditSubCat(cat: any): void {
    const ref = this.dialogService.open(SubcategoryEditComponent, {
      data: { cat },
      header: 'ویرایش سطح دوم',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getCategory();
      }
    });
  }

  deleteCat(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteCat(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'success', summary: ' حذف اطلاعات ', detail: response.data });
            this.getCategory();
          } else {
            this.messageService.add({ severity: 'error', summary: ' حذف اطلاعات ', detail: response.data });
          }
        });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  deleteSubCat(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteSubCat(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({ severity: 'success', summary: ' حذف اطلاعات ', detail: response.data });
            this.getCategory();
          } else {
            this.messageService.add({ severity: 'error', summary: ' حذف اطلاعات ', detail: response.data });
          }
        });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

}
