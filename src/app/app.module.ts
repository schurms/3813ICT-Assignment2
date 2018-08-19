import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomChannelComponent } from './pages/chat/components/chatroom-channel/chatroom-channel.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { ChatroomGroupComponent } from './pages/chat/components/chatroom-group/chatroom-group.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ChannelComponent } from './pages/admin/components/channel/channel.component';
import { GroupComponent } from './pages/admin/components/group/group.component';
import { UserComponent } from './pages/admin/components/user/user.component';

// Services
import { LoginService } from './services/login/login.service';
import { SocketService } from './services/socket/socket.service';
import { UserService } from './services/user/user.service';
import { GroupService } from './services/group/group.service';
import { ChannelService } from './services/channel/channel.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    NotfoundComponent,
    ChatInputComponent,
    ChatroomChannelComponent,
    ChatroomTitleBarComponent,
    ChatroomWindowComponent,
    ChatroomGroupComponent,
    NavbarComponent,
    AdminComponent,
    ChannelComponent,
    GroupComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    LoginService,
    GroupService,
    SocketService,
    ChannelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
