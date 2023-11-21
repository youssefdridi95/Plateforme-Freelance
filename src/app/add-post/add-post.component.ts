// add-post.component.ts

import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent   {
  postForm: FormGroup 



  constructor(){
this.postForm= new FormGroup({
  competence: new FormControl("", [Validators.required]),
  description: new FormControl(""),
  file: new FormControl(""),
  tags: new FormArray([
    new FormGroup({
      name: new FormControl("", [Validators.required])
    })
  ])
});


}

getControls() {
  return (this.postForm.get('tags') as FormArray).controls;
}

  addField() {
        let control = <FormArray> this.postForm.controls['tags'] ;

        control.push(new FormGroup({
          name: new FormControl("", [Validators.required])
        }));
  }

  removeField(index: any) {
        let control = <FormArray> this.postForm.controls['tags'] ;

    control.removeAt(index);
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.postForm.value);
  }
}
