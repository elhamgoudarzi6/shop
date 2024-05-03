import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { AdminService } from '../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { PrimengListModule } from '../../../primeng-list.module';
@Component({
  selector: 'app-reserve',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  imports: [PrimengListModule],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PaymentComponent implements OnInit {
  payments: any[] = [];

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): any {
    this.service.getPayments(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.payments = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }

}

