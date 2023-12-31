// add-post.component.ts

import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output , } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent   {


  postForm: FormGroup 

  selectedFiles: File[] = [];
  selectedFilesUrls: (string | null)[] = [];

  totalFileSizeExeeded : boolean =false
   totalSize=0
  constructor(private formBuilder: FormBuilder,private postService:PostService,private toastr: ToastrService,private route :Router ) {
    this.postForm = this.formBuilder.group({
      competence: ['', Validators.required],
      category: ['', Validators.required],
      description: ['',Validators.maxLength(500)],
      file: this.formBuilder.array([]), // 10MB limit
      tags: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required]
        })
      ])
    });
  }
  
 totalFileSizeValidator(maxTotalSize: number): boolean {
    const files = this.postForm.get('file')?.value 
    

    if (files) {
       this.totalSize = files.reduce((sum:number, file:any) => sum + file.file.size, 0);
    }
    
    return  this.totalSize> maxTotalSize;
    

  };


// We will create multiple form controls inside defined form controls photos.
createItem(data:any): FormGroup {
  return this.formBuilder.group(data);
}

//Help to get all photos controls as form array.
getPhotos() {
  return (this.postForm.get('file') as FormArray);
};


detectFiles(event:any) {
  let files = event.target.files;

  if (files) {
    let control = <FormArray> this.postForm.controls['file'] ;
      for (let file of files) {
       
          let reader = new FileReader();
          reader.onload = (e: any) => {
              control.push(this.createItem({
                  file,
                  name : file.name ,
                  url: e.target.result  //Base64 string for preview image
              }));
          }
          reader.readAsDataURL(file);
          this.totalSize+=file.size
      }
  }


  this.totalFileSizeExeeded=  this.totalSize > 10*1024*1024;
  
  


}

isImage(url: string | null): boolean {
  return url !== null && url.startsWith('data:image/');
}

isVideo(url: string | null): boolean {
  return url !== null && url.startsWith('data:video/');
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

    removefile(index: any) {
        let control = <FormArray> this.postForm.controls['file'] ;

    control.removeAt(index);

    this.totalFileSizeExeeded=this.totalFileSizeValidator(10*1024*1024)
  }

  onSubmit() {
   
  this.totalFileSizeExeeded =this.totalFileSizeValidator(10*1024*1024)
  const params = new HttpParams()
  .set('userId',JSON.parse(sessionStorage.getItem('user')!).id)
  .set('title',this.postForm.value.competence.toUpperCase())
  .set('desc',this.postForm.value.description)
  .set('category',this.postForm.value.category)
  .set('type',JSON.parse(sessionStorage.getItem('user')!).roles[0].split('_')[1])
 // .set('tags',this.postForm.value.tags.map((tag: { name: string }) => tag.name).join('///'))
   
    const formData = new FormData();
  
    const files: any = this.postForm.get('file')!.value;
    for (let i = 0; i < files.length; i++) {
      
      formData.append('files', files[i]['file']);
      
    }
  

    this.postService.add(formData,params).subscribe(
      res=>{
      
  console.log(res);
location.reload()
     
  this.toastr.success('a été publié avec success ','Post')
  // this.postForm = this.formBuilder.group({
  //   competence: ['', Validators.required],
  //   category: ['', Validators.required],
  //   description: ['',Validators.maxLength(500)],
  //   file: this.formBuilder.array([]), // 10MB limit
  //   tags: this.formBuilder.array([
  //     this.formBuilder.group({
  //       name: ['', Validators.required]
  //     })
  //   ])
  // });
  // this.totalFileSizeExeeded=false
  // this.totalSize=0
      },
      err=>{
    console.log(err);
    this.toastr.error(err.error.message,'erreur')
      }
    )

  }
}
