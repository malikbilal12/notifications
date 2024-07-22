import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  user: any = {};
  message:any
  constructor(private userService: UserService,) {}

  ngOnInit(): void {
    this.userService.requestPermission();
    this.userService.receiveMessage()
    this.message=this.userService.currentMessage
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(user: any): void {
    let data=user
    data.isView=false
    this.userService.createUser(data).then(() => {
      // handle success
    });
  }

  editUser(id: string, user: any): void {
    this.userService.updateUser(id, user).then(() => {
      // handle success
    });
  }

  deleteUser(user:any): void {
    this.userService.deleteUser(user).then(() => {
      // handle success
    });
  }


}
