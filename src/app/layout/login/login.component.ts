import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../auth/local-storage.service';
import { LayoutService } from '../layout.service';
import { PrimengListModule } from '../../primeng-list.module';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PrimengListModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;
  verifyForm: FormGroup | any;
  returnPath: any;
  code = "";
  display = false;
  timer = 90;
  invalidSMS: boolean = false;
  resendSMS: boolean = false;
  interval: any;

  messages: Message[] | any;

  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private router: Router,
    private localStorage: LocalStorageService,
    private rout: ActivatedRoute,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.createform();
    switch (window.history.state.route) {
      case 'profile':
        this.returnPath = '/profile';
        break;
      case 'cart':
        this.returnPath = '/cart';
        break;
      default:
        this.returnPath = '/';
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.invalidSMS = false;
        this.resendSMS = true;
        this.timer = 0;
        this.code = "";
      }
    }, 1000);
  }

  randomNumber() {
    var text = '';
    var possible = '123456789';
    for (var i = 0; i < 5; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? '0' : possible.charAt(sup);
    }
    return text;
  }

  sendSMS() {
    if (this.form.controls.mobile.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' شماره همراه را وارد کنید  .',
      });
    }
    else if (this.form.controls.mobile.value.length < 11) {
      this.messageService.add({
        severity: 'error',
        summary: ' شماره را به درستی وارد کنید  .',
      });
    } else {
      this.display = true;
      this.code = this.randomNumber();
      // let data = {
      //   "Mobile": this.form.value.mobile,
      //   "TemplateId": 100000,
      //   "Parameters": [
      //     {
      //       "Name": "Code",
      //       "Value": this.code
      //     }
      //   ]
      // };
      // this.service.sendSms(data).subscribe((result: any) => {
      //   if (result.status === 1) {
          this.invalidSMS = false;
          this.timer = 90;
          this.resendSMS = false;
          clearInterval(this.interval);
          this.startTimer();
      //   } else {
      //     console.log("شماره را به درستی وارد کنید");
      //   }
      // });
    }
  }

  onVerifyCode() {
    if (this.verifyForm.value.code !== this.code) {
      this.invalidSMS = true;
    } else {
      this.invalidSMS = false;
      this.login();
    }
  }

  login() {
    this.service.authUser(this.form.value).subscribe((result: any) => {
      if (result.success === true) {
        this.localStorage.removeCurrentUser();
        this.localStorage.saveCurrentUser('current', JSON.stringify(result.data));
       // this.router.navigateByUrl(this.returnPath);
        this.ref.close(true);
        location.reload();
        
      } else {
        console.log('eror')
      }
    });
  }

  createform() {
    this.form = new FormGroup({
      mobile: new FormControl(null, Validators.compose([Validators.required])),
    })
    this.verifyForm = new FormGroup({
      code: new FormControl(null, Validators.compose([Validators.required])),
    })
  }

}


//KjhpOp5jOkLKQvEcxhxEibS8GDwQvRIHnBVJTetsmG3XwkSB5K7ApOeoedVxgd4i