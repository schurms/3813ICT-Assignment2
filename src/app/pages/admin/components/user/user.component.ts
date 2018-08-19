import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data
        },
        err => console.log(err)
        // () => console.log('Done Loading Users')
      );
  }


  createUser(name, email, role){
    const user = {
      name: name,
      email: email,
      role: role
    };


    this.userService.createUser(user)
      .subscribe(
        data => {
          this.getUsers();
          return true;
        },
        error => {
          console.error(error);
        }
      );

  }

  updateUser(user){
    this.userService.updateUser(user)
      .subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error =>{
        console.error('Error saving student');
      }
    )
  }

  deleteUser(user){
    this.userService.deleteUser(user)
      .subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error('Error deleting user');
      }
    )
  }

}
