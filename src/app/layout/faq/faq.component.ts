import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { PrimengListModule } from '../../primeng-list.module';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: any[] = [];
  events = [
    { status: 'ورود', data: 'ورود به سایت و لاگین با شماره موبایل', icon: 'pi pi-sign-in', color: '#ce243e' },
    { status: 'افزودن به سبد', data: 'انتخاب محصول و افزودن به سبد خرید', icon: 'pi pi-cart-plus', color: '#9C27B0' },
    { status: 'حساب کاربری', data: 'تکمیل فرم مشخصات کاربری', icon: 'pi pi-user', color: '#FF9800' },
    { status: 'ثبت آدرس', data: 'ثبت و انتخاب آدرس جهت دریافت کالا', icon: 'pi pi-map-marker', color: '#607D8B' },
    { status: 'درگاه پرداخت', data: 'اتصال به درگاه پرداخت و پرداخت هزینه کالا', icon: 'pi pi-money-bill', color: '#673AB7' },
    { status: 'تایید سفارش', data: 'ثبت نهایی سفارش و دریافت پیامک تایید سفارش', icon: 'pi pi-check-circle', color: 'green' },
  ];
  constructor(private service: LayoutService) { }

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs() {
    this.service.getFaqs()
      .subscribe((response: any) => {
        if (response.success === true) {
          this.faqs = response.data;
        } else {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: ''
          // })
        }
      });
  }

}
