import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks-module').then(m => m.TasksModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
