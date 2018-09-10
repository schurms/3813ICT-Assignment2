import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ChatroomChannelComponent } from './pages/chat/components/chatroom-channel/chatroom-channel.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { ChatroomGroupComponent } from './pages/chat/components/chatroom-group/chatroom-group.component';
import { ChatroomHistoryComponent } from './pages/chat/components/chatroom-history/chatroom-history.component';
import { NavbarComponent } from './shared_components/navbar/navbar.component';
import { ChannelComponent } from './pages/admin/channel/channel.component';
import { GroupComponent } from './pages/admin/group/group.component';
import { UserComponent } from './pages/admin/user/user.component';
import { GroupuserComponent } from './pages/admin/group/groupdetail/groupuser/groupuser.component';
import { GroupchannelComponent } from './pages/admin/group/groupdetail/groupchannel/groupchannel.component';
import { ChanneluserComponent } from './pages/admin/channel/channeldetail/channeluser/channeluser.component';

// Services
import { SocketService } from './services/socket/socket.service';
import { UserService } from './services/user/user.service';
import { GroupService } from './services/group/group.service';
import { ChannelService } from './services/channel/channel.service';
import { AuthService } from './services/auth/auth.service';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    NotfoundComponent,
    ChatroomChannelComponent,
    ChatroomWindowComponent,
    ChatroomGroupComponent,
    ChatroomHistoryComponent,
    NavbarComponent,
    ChannelComponent,
    GroupComponent,
    UserComponent,
    GroupuserComponent,
    GroupchannelComponent,
    ChanneluserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthService,
    GroupService,
    SocketService,
    ChannelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
