import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/admin/components/user/user.component';
import { GroupComponent } from './pages/admin/components/group/group.component';
import { ChannelComponent } from './pages/admin/components/channel/channel.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'users', component: UserComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'channels', component: ChannelComponent},
  { path: 'chat',
    children: [
      { path: '',  component: ChatComponent},
      { path: ':channelId', component: ChatComponent}
    ]
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
