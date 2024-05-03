import { AdminService } from '../../admin.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../../auth/local-storage.service';
import { PrimengListModule } from '../../../../primeng-list.module';

@Component({
  selector: 'app-subcategory-add',
  standalone: true,
  templateUrl: './subcategory-add.component.html',
  styleUrl: './subcategory-add.component.scss',
  imports: [ReactiveFormsModule, PrimengListModule],
  providers: [MessageService]
})

export class SubcategoryAddComponent {

  form: FormGroup | any;
  errorMessages = {
    title: [
      { type: 'required', message: 'عنوان دسته بندی را وارد کنید.' },
      { type: 'maxlength', message: 'عنوان دسته بندی نمی تواند از 500 کاراکتر بیشتر باشد.' }
    ]
  };

  constructor(private formBuilder: FormBuilder,
    private service: AdminService,
    private ref: DynamicDialogRef,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
    console.log(this.config.data.id);
    
  }

  createform(): void {
    this.form = this.formBuilder.group({
      catID: new FormControl(this.config.data.id),
      title: new FormControl(null, Validators.required),
      image: new FormControl(null),
      metaData: new FormControl(null),
      keywords: new FormControl(null),
    });
  }

  submitForm(): void {
    this.service.addSubCat(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
      }
    });
  }


}
