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
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { ChatgroupListComponent } from './pages/chat/components/chatgroup-list/chatgroup-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { UserListComponent } from './pages/admin/components/user-list/user-list.component';
import { UserEditComponent } from './pages/admin/components/user-edit/user-edit.component';
import { GroupListComponent } from './pages/admin/components/group-list/group-list.component';
import { GroupEditComponent } from './pages/admin/components/group-edit/group-edit.component';
import { ChannelListComponent } from './pages/admin/components/channel-list/channel-list.component';
import { ChannelEditComponent } from './pages/admin/components/channel-edit/channel-edit.component';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    NotfoundComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatroomWindowComponent,
    ChatgroupListComponent,
    NavbarComponent,
    AdminComponent,
    GroupsComponent,
    UserListComponent,
    UserEditComponent,
    GroupListComponent,
    GroupEditComponent,
    ChannelListComponent,
    ChannelEditComponent
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
