import { AdminService } from '../../admin.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from '../../../../auth/local-storage.service';
import { PrimengListModule } from '../../../../primeng-list.module';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,PrimengListModule],
  providers: [MessageService]
})
export class CategoryEditComponent implements OnInit {

  form: FormGroup | any;

  errorMessages = {
    title: [{ type: 'required', message: 'عنوان دسته بندی را وارد کنید.' },]
  };
  cat: any;

  constructor(private formBuilder: FormBuilder,
    private service: AdminService,
    public messageService: MessageService,
    public ref: DynamicDialogRef,
    private localStorage: LocalStorageService,
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.cat = this.config.data.cat;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.cat.title, Validators.required),
      metaData: new FormControl(this.cat.metaData),
      keywords: new FormControl(this.cat.keywords),
    });
  }

  submitForm(): void {
    this.service.editCat(this.localStorage.userToken, this.cat._id, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
      }
    });
  }


}
