import { NgModule } from '@angular/core';
import { Login } from './components/login/login';
import { AuthRoutingModule } from './auth-routing-module';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [
    Login
  ],
  imports: [SharedModule, AuthRoutingModule]
})
export class AuthModule { }
