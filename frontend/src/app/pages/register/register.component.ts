import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { uniqueUsernameValidator } from '../../validators/unique-username.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit{
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);
    registerForm !: FormGroup;

    ngOnInit(): void {
        this.registerForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.compose([Validators.required, Validators.email])],
          userName: ['', { 
            validators: [Validators.required],
            asyncValidators: [uniqueUsernameValidator(this.authService)],
             updateOn: 'blur'
          }],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required]
        },
        {
          validator : confirmPasswordValidator('password','confirmPassword')
        }
      );
    }

    register(){
      this.authService.registerService(this.registerForm.value).subscribe({
        next: (res)=>{
          alert("User created");
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
}
