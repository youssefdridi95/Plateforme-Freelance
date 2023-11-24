// add-post.component.ts

import { Component ,Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent   {
  @Input() post: boolean = false; // Recevoir la propriété post du composant parent

  postForm: FormGroup 

  selectedFiles: File[] = [];
  selectedFilesUrls: (string | null)[] = [];

  totalFileSizeExeeded : boolean =false
   totalSize=0
  constructor(private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      competence: ['', Validators.required],
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
   
  this.totalFileSizeExeeded =this.totalFileSizeValidator(1*1024*1024)


    const formData = new FormData();
  
    formData.append('competence', this.postForm.value.competence);
    formData.append('description', this.postForm.value.description);
  
    // Assuming files is an array of File objects
    const files: FileList = this.postForm.get('file')!.value;
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
  
    // Assuming tags is an array of tag objects
    const tags = this.postForm.value.tags;
    for (let i = 0; i < tags.length; i++) {
      formData.append('tags', tags[i].name);
    }
  
    // const formDataObject: any = {};
    // formData.forEach((value, key) => {
    //   if (!formDataObject[key]) {
    //     formDataObject[key] = value;
    //   } else {
    //     if (!Array.isArray(formDataObject[key])) {
    //       formDataObject[key] = [formDataObject[key]];
    //     }
    //     formDataObject[key].push(value);
    //   }
    // });
  
    // // Log the converted object
    // console.log(formDataObject);
  }
}
