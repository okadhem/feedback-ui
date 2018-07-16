import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginService} from './login.service';
import {UserService} from '../user/user.service';
import {AuthgardGuard} from './authgard.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LoginService, UserService,AuthgardGuard]
})
export class LoginModule { }
