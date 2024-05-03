import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimengListModule } from '../../../primeng-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { LoginComponent } from '../../login/login.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LayoutService } from '../../layout.service';
import { CartService } from '../../cart/cart.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimengListModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],

})
export class HeaderComponent implements OnInit {
  screenWidth = window.innerWidth;
  items: MenuItem[] | any;
  items1: MegaMenuItem[] | undefined;
  pcMenuCats: MegaMenuItem[] | undefined;
  mobileMenuCats: MenuItem[] = [];
  cats: any[] = [];
  display = false;
  filteredProductNames: any[] = [];
  currentUser: boolean = false;
  type: any;
  displayBasket: boolean = false;
  tabs: MenuItem[] | undefined;
  cartlist: any = [];
  activeItem: MenuItem | undefined;
  autoComplete = { width: '{window.innerWidth}' + 'px' }
  products: any[] = [];
  showBasket() {
    this.cartlist = this.cartService.getItems();
    this.displayBasket = !this.displayBasket;
  }
  sum(items: any[]) {
    let total = 0;
    items.forEach(item => { total += item.pricefinal * item.number })
    return total;
  }
  filterProductName(event: any) {
    this.filteredProductNames = this.products.filter((item: any) => item.title.toLowerCase().includes(event.query.toLowerCase()));
  }

  onProductNameChange(e: any) {
    if (e._id !== undefined) {
      this.router.navigate(['/product/' + e._id], { state: e });
    }
  }

  constructor(
    private viewportScroller: ViewportScroller,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: LayoutService,
    public cartService: CartService,
    private router: Router) {
  }

  activateMenu(event: any) {
    if (event.activeItem.label === 'خانه') {
      this.router.navigateByUrl('/');
    }
    if (event.activeItem.label === 'دسته بندی') {
      this.display = true
    }
    if (event.activeItem.label === 'سبد خرید') {
      this.showBasket()
    }
    if (event.activeItem.label === 'حساب من') {
      this.localStorage.getCurrentUser('current') ? this.router.navigateByUrl('/profile') : this.showLoginDialog();
    }
  }


  getProduct() {
    this.service.getProduct().subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          detail: ' دریافت نشد ',
        });
      }
    });
  }

  ngOnInit(): void {
    this.tabs = [
      { label: 'خانه', icon: 'pi pi-fw pi-shop', badge: 'false' },
      { label: 'دسته بندی', icon: 'pi pi-fw pi-th-large', badge: 'false' },
      { label: 'سبد خرید', icon: 'pi pi-fw pi-shopping-bag foot', badge: 'true' },
      { label: 'حساب من', icon: 'pi pi-fw pi-user', badge: 'false' },
    ];
    this.activeItem = this.tabs[0];
    this.getMenu();
    this.getCat();
    this.getProduct();
    this.currentUser = this.localStorage.getCurrentUser('current');
    this.type = this.localStorage.userType;
    this.cartlist = this.cartService.getItems();

    this.items = [
      {
        label: 'فروشگاه',
        icon: 'pi pi-pw pi-shop',
        command: () => this.router.navigate(['/']),
      },
      {
        label: 'محصولات',
        icon: 'pi pi-fw pi-bars',
        items: this.mobileMenuCats,
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-fw pi-question-circle',
        command: () => this.router.navigate(['/faq']),
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        command: () => this.onClick('footer')
      }
    ];

    this.items1 = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-fw pi-shop',
        command: () => this.router.navigate(['/']),
      },
      {
        label: 'محصولات',
        icon: 'pi pi-fw pi-bars',
        command: () => this.router.navigate(['/products']),
        items: [
          [
            {
              label: 'گوشی موبایل',
              items: [{ label: 'گوشی اپل' }, { label: 'گوشی سامسونگ' }]
            },
            {
              label: 'لوازم جانبی موبایل',
              items: [{ label: 'شارژر گوشی' }, { label: 'کاور گوشی' }]
            }
          ],
          [
            {
              label: 'هدفون',
              items: [{ label: 'هدفون بی سیم' }, { label: 'هدفون اپل' }]
            },
            {
              label: 'ساعت هوشمند',
              items: [{ label: 'اپل واچ' }, { label: 'شیائومی' }]
            }
          ],
          [
            {
              label: 'پاور بانک',
              items: [{ label: 'شیائومی' }, { label: 'سامسونگ' }]
            },
            {
              label: 'فلش',
              items: [{ label: 'فلش 128' }, { label: 'فلش 64' }]
            }
          ]
        ]
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-fw pi-question-circle',
        command: () => this.router.navigate(['/faq']),
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        command: event => this.onClick('footer')
      }
    ];
  }
  getMenu() {

  }

  getCat() {
    this.service.getCat().subscribe((response: any) => {
      if (response.success === true) {
        this.cats = response.data;

        //mobile menu
        let subList: MenuItem[];
        this.mobileMenuCats.push({
          label: 'همه محصولات',
          command: () => this.goProduct(0, 0),
        });

        this.cats.forEach((cat) => {
          subList = [];
          if (cat.SubCat.length > 0) {
            subList.push({
              label: 'همه',
              command: (event) => this.goProduct(cat._id, 0),
            });
            cat.SubCat.forEach((sub: any) => {
              subList.push({
                label: sub.title,
                command: () => this.goProduct(cat._id, sub._id),
              });
            });
            this.mobileMenuCats.push({
              label: cat.title,
              items: subList,
            });
          } else {
            this.mobileMenuCats.push({
              label: cat.title,
              command: () => this.goProduct(cat._id, 0),
            });
          }
        });
      }
    });
  }

  goProduct(catId: any, subCatId: any): any {
    this.router.navigateByUrl('/products/' + catId + '/' + subCatId);
  }

  showMenu(): void {
    this.display = true;
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    if (this.display === true) {
      this.display = false;
    }
  }

  showLoginDialog() {
    const ref = this.dialogService.open(LoginComponent, {
      width: window.innerWidth > 840 ? '40%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        location.reload();
      }
    });
  }

  onDeleteCart(item: any) {
    this.cartService.deleteItem(item);
    this.cartlist = this.cartService.getItems();
  }

  gotoCart() {
    this.router.navigateByUrl('/cart');
    this.displayBasket = false;
  }
  
}
