// Modules
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
// Models
import { User } from '../../models/user.model';
// Services
import { ImguploadService } from '../../services/imgupload/imgupload.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedfile = null;
  imagepath="";
  userId;
  user: User;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private imguploadService: ImguploadService,
    private userService: UserService,
    private location: Location) { }

  // On Page Opening
  ngOnInit() {
    if(!sessionStorage.getItem('user')) {
      // No valid session is available
      this.authService.deleteUser();
      this.router.navigateByUrl('404');
    } else {
      this.userId = +this.route.snapshot.paramMap.get('id');
      this.getUsers();
    }
  }

  // On File Selection
  onFileSelected(event) {
    this.selectedfile = event.target.files[0];
  }

  // On File Uploading
  onUpload() {
    const fd = new FormData();
    fd.append('image',this.selectedfile, this.selectedfile.name);
    this.imguploadService.imgupload(fd)
      .subscribe( res => {
        this.updateAvatar();
        this.getUsers();
        location.reload();
      });
  }

  // Get current avatar
  getUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data.users;
          this.user = this.users.find(user => user.id ==  this.userId);
          this.imagepath = this.user.userimage;
        },
        err => console.log(err)
      );
  }

  // Update a Product
  updateAvatar() {
    const addAvatar = {
      id: this.userId,
      userimage: this.selectedfile.name,
    };
    this.userService.updateAvatar(addAvatar)
      .subscribe(
        data => {
          return true;
        },
        err => console.log(err)
      );
  }

  // Return to Previous Page
  goBack() {
    this.location.back();
  }
}
