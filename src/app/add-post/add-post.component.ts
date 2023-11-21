// add-post.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      competence: ['', Validators.required],
      description: [''],
      file: [''],
      tags: ['']
    });
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.postForm.value);
  }
}
