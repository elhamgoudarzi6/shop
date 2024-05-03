import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../auth/local-storage.service';
import { PrimengListModule } from '../../../../primeng-list.module';

@Component({
  selector: 'app-product-add',
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
  imports: [ReactiveFormsModule, PrimengListModule],
  providers: [MessageService]
})
export class ProductAddComponent implements OnInit {
  form: FormGroup | any;
  formInfo: FormGroup | any;
  myGroup: FormGroup | any;
  myFeature: FormGroup | any;
  cats: any[] = [];
  subCats: any[] = [];
  discounts: any[] = [];
  colors: any[] = [];
  info: any[] = [];
  features: any[] = [];

  constructor(
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.getCat();
    this.getDiscount();
    this.getColor();
    this.getFeature();
    this.createForm();
  }

  onCatChange(e: any) {
    this.form.controls.catID.setValue(e.value._id);
    this.subCats = e.value.SubCat;
  }
  onSubCatChange(e: any) {
    this.form.controls.subCatID.setValue(e.value._id);
  }
  onDiscountChange(e: any) {
    this.form.controls.discountID.setValue(e.value._id);
  }
  onColorChange(e: any) {
    this.formInfo.controls.color.setValue(e.value.name);
    this.formInfo.controls.colorCode.setValue(e.value.code);
  }

  delInfo(index: any) {
    this.info.splice(index, 1);
  }

  addInfo() {
    if (this.formInfo.value.color == null || this.formInfo.value.price == null || this.formInfo.value.initialNumber == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'لطفا اطلاعات به طور کامل وارد کنید',
      });
    }
    else {
      this.info.push({
        color: this.formInfo.value.color,
        colorCode: this.formInfo.value.colorCode,
        price: this.formInfo.value.price,
        initialNumber: this.formInfo.value.initialNumber,
        remainsNumber: this.formInfo.value.initialNumber,
        image: this.formInfo.value.image,
      });
    }
    this.formInfo.controls['color'].reset();
    this.formInfo.controls['price'].reset();
    this.formInfo.controls['initialNumber'].reset();
  }

  createForm() {
    this.myGroup = new FormGroup({
      cell: new FormControl(null),
    });
    this.myFeature = new FormGroup({
      cell: new FormControl(null),
    });

    this.formInfo = new FormGroup({
      color: new FormControl(null),
      colorCode: new FormControl(null),
      price: new FormControl(null),
      initialNumber: new FormControl(null),
      //image: new FormControl(null),
      //  remainsNumber: new FormControl(null),
    });

    this.form = new FormGroup({
      catID: new FormControl(null),
      subCatID: new FormControl(null),
      title: new FormControl(null),
      detail: new FormControl(null),
      price: new FormControl(null),
      image: new FormControl(null),
      features: new FormControl(null),
      info: new FormControl(null),
      keywords: new FormControl(null),
      imageDescription: new FormControl(null),
      metaDescription: new FormControl(null),
      discountID: new FormControl(null),
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
  getCat(): any {
    this.service.getCat(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.cats = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت نشد ',
        });
      }
    });
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
  onFileUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.upload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.path);
        this.messageService.add({
          severity: 'success',
          summary: 'آپلود شد ',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'آپلود نشد',
          detail: response.data,
        });
      }
    });
  }

  submitForm(): void {
    let priceList: any[] = [];
    this.info.forEach((item) => {
      priceList.push(item.price);
    });
    let minPrice = Math.min(...priceList);
    this.form.controls.price.setValue(minPrice);
    this.form.controls.features.setValue(this.features);
    this.form.controls.info.setValue(this.info);
    if (this.form.controls.title.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'عنوان را وارد کنید',
      });
    } else if (this.form.controls.detail.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'توضیحات را وارد کنید',
      });
    } else {
      this.service.addProduct(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
    }
  }

}






