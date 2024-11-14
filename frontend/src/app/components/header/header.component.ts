import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import  JointCartComponent  from '../../pages/joint-cart/joint-cart.component';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, JointCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

     authService = inject(AuthService);
     isLoggedIn: boolean = false;
     productService = inject(ProductService);
     router = inject(Router);
     username: string | null = null;
     productInput!:string;
      ngOnInit(): void {
          this.authService.isLoggedIn$.subscribe(res=>{
            this.isLoggedIn = this.authService.isLoggedIn();
          })
          if(this.isLoggedIn)
            this.username = localStorage.getItem('username');
      }

     logout(){
      localStorage.removeItem("user_id");
      localStorage.removeItem("chat_id");
      localStorage.removeItem("username");
      this.authService.isLoggedIn$.next(false);
      this.router.navigate(['/welcome']);
     }

     showCreateCart() {
      this.productService.setCreateCart();
      this.router.navigate(['/joint-cart']);
    }
  
    showJoinCart() {
      this.productService.setJoinCart();
      this.router.navigate(['/joint-cart']);
    }
    searchProduct(productId:string){

    }
  
}
