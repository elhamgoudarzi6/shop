import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { PrimengListModule } from '../../../../primeng-list.module';

@Component({
  selector: 'app-color-add',
  standalone: true,
  templateUrl: './color-add.component.html',
  styleUrl: './color-add.component.scss',
  imports: [ReactiveFormsModule, PrimengListModule],
  providers: [MessageService]
})
export class ColorAddComponent implements OnInit {

  public form: FormGroup | any;
  constructor(
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required])
    });
  }

  submitForm(): void {
    if (this.form.controls.code.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' کد رنگ را وارد کنید.',
      });
    } else if (this.form.controls.name.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' نام رنگ را وارد کنید.',
      });
    } else {
      this.service.addColor(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
        }
      });
    }
  }

}
