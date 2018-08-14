import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AdminComponent } from './pages/admin/admin.component';
import { GroupEditComponent } from './pages/admin/components/group-edit/group-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signin' },
  { path: 'signin', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'chat', component: ChatComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'groupdetail/:id', component: GroupEditComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
