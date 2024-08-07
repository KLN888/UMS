import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'users',
  loadChildren: () => import('./modules/users/users.module').then(mod => mod.UsersModule)
},
{
  path:'permissions',
  loadChildren: () => import('./modules/permissions/permissions.module').then(mod => mod.PermissionsModule)
},
{
  path:'messages',
  loadChildren: () => import('./modules/messages/messages.module').then(mod => mod.MessagesModule)
},
{
  path:'tasks',
  loadChildren: () => import('./modules/tasks/tasks.module').then(mod => mod.TasksModule)
},
{
  path:'settings',
  loadChildren: () => import('./modules/settings/settings.module').then(mod => mod.SettingsModule)
},
{
  path: '',
  redirectTo: 'users',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
