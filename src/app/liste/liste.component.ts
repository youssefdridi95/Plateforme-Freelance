import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {
  

  userForm !:FormGroup
  userList: any;
  constructor(private formBuilder:FormBuilder) {  }

  ngOnInit (): void{
  this.userForm= this.formBuilder.group({
    nom:['',Validators.required],
    email:['',Validators.required],
    role:['',Validators.required],
   },

  )
  }


 
 user = {
    nom : '' ,
    email : '' ,
    role : '' ,
  }
   
  
  
add(){
  console.log('here into userform', this.userForm.value)
  if (this.userForm.valid) {
    const newUser = this.userForm.value;
    this.userList.push(newUser);
    this.userForm.reset();
  }
}
delete()
{}




}