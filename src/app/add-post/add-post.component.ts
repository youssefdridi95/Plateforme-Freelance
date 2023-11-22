// add-post.component.ts

import { Component ,Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      competence: ['', Validators.required],
      description: [''],
      file: this.formBuilder.array([]),
      tags: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required]
        })
      ])
    });
  }
  
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
                  url: e.target.result  //Base64 string for preview image
              }));
          }
          reader.readAsDataURL(file);
      }
  }

  
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
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.postForm.value);
    
  }
}


// onFileChange(event: any) {
//   const files: FileList = event.target.files;
//   if (files.length > 0) {
//     // Use spread operator to create a new array
//     this.selectedFiles = Array.from(files).slice(0, 10) as File[];
//     this.displaySelectedFiles();
//   } else {
//     this.selectedFiles = [];
//     this.selectedFilesUrls = [];
//   }
// }


// async displaySelectedFiles() {
//   this.selectedFilesUrls = (await Promise.all(this.selectedFiles.map(file => this.getFileUrl(file))))
//     .filter(url => url !== null) as string[];
// }

// async getFileUrl(file: File): Promise<string | null> {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       resolve(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//   });
// }

// isImage(url: string | null): boolean {
//   return url !== null && url.startsWith('data:image/');
// }

// isVideo(url: string | null): boolean {
//   return url !== null && url.startsWith('data:video/');
// }