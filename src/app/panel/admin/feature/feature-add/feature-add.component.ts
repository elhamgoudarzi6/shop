import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { PrimengListModule } from '../../../../primeng-list.module';

@Component({
  selector: 'app-feature-add',
  standalone: true,
  templateUrl: './feature-add.component.html',
  styleUrl: './feature-add.component.scss',
  imports: [ReactiveFormsModule, PrimengListModule],
  providers: [MessageService]
})
export class FeatureAddComponent implements OnInit{

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
      feature: new FormControl(null, [Validators.required]),
      value: new FormControl(""),
    });
  }

  submitForm(): void {
    if (this.form.controls.feature.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' ویژگی را وارد کنید.',
      });
    }else {
      this.service.addFeature(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
        }
      });
    }
  }

}
