import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from './../layout.service';
import { ActivatedRoute } from '@angular/router';
import { MatrialListModule } from '../../matrial-list.module';
import { PrimengListModule } from '../../primeng-list.module';
import { MenuItem, MessageService } from 'primeng/api';
import { CartService } from '../cart/cart.service';
@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [MatrialListModule, PrimengListModule],
  providers: [MessageService],
})
export class ProductComponent implements OnInit {
  items: MenuItem[] | undefined;
  data: any;
  product: any;
  displayBasic: boolean | any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1600px',
      numVisible: 3,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private cartService: CartService,
    private route: ActivatedRoute) { }


  addCart() {
    let list = {};
    if (this.data.remainsNumber > 0) {
      list = {
        productID: this.product.id,
        infoID: this.data.infID,
        title: this.product.title,
        colorCode: this.data.colorCode,
        color: this.data.color,
        image: this.data.image,
        price: this.data.price,
        pricefinal: this.data.pricefinal,
        discountTitle: this.product.Discount[0].title,
        discountCode: this.product.Discount[0].code,
        discountPercent: this.product.Discount[0].percent,
        number: 1,
      };
      this.displayBasic = true;
      this.cartService.addToCart(list);
      this.cartService.getItems()
      this.messageService.add({
        severity: 'success',
        detail: 'به سبد افزوده شد',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'کالا موجود نیست',
      });
    }
  }
  getData(item: any) {
    this.data = {};
    this.data.color = item.color;
    this.data.colorCode = item.colorCode;
    this.data.image = item.image;
    this.data.remainsNumber = item.remainsNumber;
    this.data.infID = item._id;
    this.data.price = item.price;
    this.data.discountPercent = this.product.Discount[0].percent;
    this.data.discountCode = this.product.Discount[0].code;
    if (this.product.Discount[0].percent > 0) {
      this.data.pricefinal = item.price - this.product.Discount[0].percent * item.price / 100;
    } else {
      this.data.pricefinal = item.price;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => { this.product = window.history.state });
    // this.route.paramMap.subscribe((params) => { this.product = params.get('item') });
    this.data = {};
    this.data.color = this.product.info[0].color;
    this.data.colorCode = this.product.info[0].colorCode;
    this.data.price = this.product.info[0].price;
    this.data.image = this.product.info[0].image;
    this.data.remainsNumber = this.product.info[0].remainsNumber;
    this.data.infID = this.product.info[0]._id;
    this.data.discountPercent = this.product.Discount[0].percent;
    this.data.discountCode = this.product.Discount[0].code;
    if (this.product.Discount[0].percent > 0) {
      this.data.pricefinal = this.product.info[0].price - this.product.Discount[0].percent * this.product.info[0].price / 100;
    } else {
      this.data.pricefinal = this.product.info[0].price;
    }
    this.items = [
      { label: this.product.Cat[0].title, icon: 'pi pi-chevron-left' },
      { label: this.product.SubCat[0].title, icon: 'pi pi-chevron-left' },
    ];

  }

}
