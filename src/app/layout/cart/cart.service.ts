import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

let subject = new Subject<any>();

@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: any;

  constructor() {
    if (JSON.parse(localStorage.getItem('cartList')!) == null) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
  }

  addToCart(list: any) {
    let local_Storage;
    let itemsInCart = [];
    this.items = list;
    if (localStorage.getItem('cartList') === null) {
      itemsInCart.push(this.items);
      localStorage.setItem('cartList', JSON.stringify(itemsInCart));
      subject.next('changed');
    } else {
      local_Storage = JSON.parse(localStorage.getItem('cartList') || "");
      local_Storage.forEach((item: any) => {
        if (this.items.productID === item.productID && this.items.infoID === item.infoID) {
          let number = parseInt(item.number);
          number = number + 1;
          this.items.number = number;
          let index = parseInt(item);
          item.splice(index, 1);
          localStorage.setItem('cartList', JSON.stringify(item));
        }
      })
    }
    if (this.items) {
      itemsInCart.push(this.items);
    }
    local_Storage.forEach((item: any) => {
      itemsInCart.push(item);
    });
    localStorage.setItem('cartList', JSON.stringify(itemsInCart));
    subject.next('changed');
  }

  deleteItem(item: any) {
    let shopping_cart;
    let index;
    shopping_cart = JSON.parse(localStorage.getItem('cartList')!);
    for (let i in shopping_cart) {
      if (item.productID === shopping_cart[i].productID) {
        index = i;
      }
    }
    shopping_cart.splice(index, 1);
    localStorage.setItem('cartList', JSON.stringify(shopping_cart));
  }

  getCount() {
    return JSON.parse(localStorage.getItem('cartList')!).length > 0 ? JSON.parse(localStorage.getItem('cartList')!).length : 0;
  }

  getItems() {
    return this.items = JSON.parse(localStorage.getItem('cartList')!);
  }


  clearCart() {
    localStorage.setItem('cartList', JSON.stringify([]));
  }


}

