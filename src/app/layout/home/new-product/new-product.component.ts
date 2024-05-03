import { Component, OnInit } from '@angular/core';
import { PrimengListModule } from '../../../primeng-list.module';
import { MessageService } from 'primeng/api';
import { LayoutService } from '../../layout.service';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
  providers: [MessageService]

})
export class NewProductComponent {

  products: any[] = [];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    },
    // {swipeable:true}
  ];
  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    private token: TokenService,
    private localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.service.getProduct().subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت نشد ',
        });
      }
    });
  }
}
