// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Pages
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UserComponent } from './pages/admin/user/user.component';
import { GroupComponent } from './pages/admin/group/group.component';
import { ChannelComponent } from './pages/admin/channel/channel.component';
import { GroupuserComponent } from './pages/admin/group/groupdetail/groupuser.component';

// Routes
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent },
  { path: 'groups', component: GroupComponent},
  { path: 'groupdetail/:id', component: GroupuserComponent},
  { path: 'channels', component: ChannelComponent},
  { path: 'chat', component: ChatComponent},
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
