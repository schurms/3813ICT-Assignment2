import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

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
import { GroupsComponent } from './pages/admin/components/groups/groups.component';
import { ChannelListComponent } from './pages/admin/components/channel-list/channel-list.component';
import { ChannelEditComponent } from './pages/admin/components/channel-edit/channel-edit.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { UserComponent } from './pages/admin/components/user/user.component';


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
    GroupsComponent,
    ChannelListComponent,
    ChannelEditComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
