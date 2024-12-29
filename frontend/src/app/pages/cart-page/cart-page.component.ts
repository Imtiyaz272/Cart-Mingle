import { Component, inject, OnInit } from '@angular/core';
import { Cart, ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import ChatComponent  from '../chat/chat.component';
import { response } from 'express';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, ChatComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export default class CartPageComponent implements OnInit{
     
  cart!:Cart;
  productService = inject(ProductService);
  authService = inject(AuthService);
  userId : string | null = null;
  isOwner : boolean = false;
  cartName:string='';
  products: { [productId: string]: any } = {};
  create!:boolean;
  join!:boolean;
  ngOnInit(): void {
      
    this.create = this.productService.create;
    this.join = this.productService.join;
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = localStorage.getItem('user_id');
     }
      console.log(this.userId);
      if(this.userId)
      {
        this.productService.getCart(this.userId).subscribe({
        next:(data) => {
          this.cart = data;
          this.cartName = data.cartName;
          this.productService.setAmount(this.cart.totalPrice);
        },
        error:(err) => {
          console.log('Error fetching the cart');
        }
      })
    }
  }

  updateQuantity(quantity:number, productId:string){
    if(this.userId)
    this.productService.addToCartSer(productId, quantity, this.userId).subscribe({
      next:(res) => {
        console.log("Quantity updated successfully");
        this.loadCart();
      }
    })
  }

  increaseQuantity(cartItem: any): void {
    if (cartItem.quantity < 10) { 
      cartItem.quantity++;
      this.updateQuantity(cartItem.quantity, cartItem.productId);
    }
  }
  
  decreaseQuantity(cartItem: any): void {
    if (cartItem.quantity > 1) { 
      cartItem.quantity--;
      this.updateQuantity(cartItem.quantity, cartItem.productId);
    }
  }
  
  removeItem(productId:string)
  {
    const itemToRemove = this.cart.items.find(item=> item.productId===productId);
    if(itemToRemove){
      this.cart.totalPrice -= itemToRemove.price * itemToRemove.quantity;
      this.cart.items = this.cart.items.filter(item => item.productId !== productId);
    }
      if(this.userId)
        this.productService.removeItem(this.userId, productId).subscribe(
      (response) => {
        console.log("Item removed successfully");
        this.loadCart();
      }
    )
  }
  
  loadCart()
  {
    if (this.userId) {
      this.productService.getCart(this.userId).subscribe({
        next: (data) => {
          this.cart = data;
          this.cartName = data.cartName;
          this.productService.setAmount(this.cart.totalPrice);
        },
        error: (err) => {
          console.log('Error reloading the cart');
        }
      });
    }
  }

}
