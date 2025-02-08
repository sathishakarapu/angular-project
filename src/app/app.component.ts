import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userObject: User = new User();
  isEditing: boolean = false;
  userList: User[] = [];

  http = inject(HttpClient);

  onSave() {
    this.http.post("http://localhost:3000/userList",this.userObject).subscribe((res:any) => {
      this.getData();
      this.clearForm();
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.get("http://localhost:3000/userList").subscribe((res:any) => {
      this.userList = res;
    })
  };

  onEdit(id:number) {
    this.isEditing = true;
    this.http.get("http://localhost:3000/userList/"+id).subscribe((res:any) => {
      this.userObject = res;
    })
  }

  onUpdate(){
    this.http.put("http://localhost:3000/userList/"+this.userObject.id,this.userObject).subscribe((res:any) => {
      this.getData();
      this.isEditing = false;
      this.clearForm();
    })
  }

  onDelete(id:number) {
    this.http.delete("http://localhost:3000/userList/"+id).subscribe((res:any) => {
      this.getData();
    });
  }

  clearForm(){
    this.userObject = new User();
  }
}

class User {
  id:any;
  firstName: string;
  lastName: string;
  userName: string;
  city: string;
  state: string;
  zipcode: number;
  isAgree: boolean;

  constructor() {
      (this.id),
      (this.firstName = ''),
      (this.lastName = ''),
      (this.userName = ''),
      (this.city = ''),
      (this.state = ''),
      (this.zipcode = 0),
      (this.isAgree = false);
  }
}
