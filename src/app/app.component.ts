import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  public isVisible = true;
  public isEditing = false;
  public editIndex: number | null = null;

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  changeView(){
    this.isVisible = !this.isVisible;
  }

  userObject: User = new User();

  saveUser() {
    if (!this.isEditing) {
      const newUser = { ...this.userObject, id: (this.users.length + 1).toString() };
      this.users.push(newUser);
      this.updateLocalStorage();
      this.clearForm();
      this.changeView();
    }
  }

  updateUser() {
    if (this.isEditing && this.editIndex !== null) {
      this.users[this.editIndex] = { ...this.userObject };
      this.updateLocalStorage();
      this.isEditing = false;
      this.editIndex = null;
      this.clearForm();
      this.changeView();
    }
  }

  users = [
    { id:"1",firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', state: 'California', district: 'LA', country: 'USA', email: 'john@example.com', pincode: '90001', gender: 'Male' },
    { id:"2",firstName: 'Jane', lastName: 'Smith', phoneNumber: '9876543210', state: 'Texas', district: 'Houston', country: 'USA', email: 'jane@example.com', pincode: '77001', gender: 'Female' },
    { id:"3",firstName: 'Raj', lastName: 'Kumar', phoneNumber: '8765432109', state: 'Maharashtra', district: 'Mumbai', country: 'India', email: 'raj@example.com', pincode: '400001', gender: 'Male' }
  ];

  clearForm(){
    this.userObject = new User();
    this.isEditing = false;
    this.editIndex = null;
  }

  deleteUser(userId: string) {
    this.users = this.users.filter(user => user.id !== userId);
    this.updateLocalStorage();
  } 

  editUser(user: any) {
    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      this.userObject = { ...this.users[userIndex] }; // Clone user data into form
      this.isEditing = true;
      this.editIndex = userIndex;
      this.changeView();
    }
  }

  updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

}


class User {

  id:any;
  firstName:string;
  lastName:string;
  phoneNumber:any;
  state:string;
  district:string;
  country:string;
  pincode:any;
  gender:string;
  email:string;
  
  constructor() {
    this.id,
    this.firstName="",
    this.lastName="",
    this.phoneNumber,
    this.state="",
    this.district="",
    this.country="",
    this.pincode,
    this.gender="",
    this.email=""
  }
}